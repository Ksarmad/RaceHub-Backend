import prisma from "../../config/prisma";
import AppError from "../../common/errors/AppError";

function parseFinishTimeToSortableMs(finishTime: string): number {
  const trimmed = finishTime.trim();

  // seconds number, e.g. 75.32
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    const seconds = Number(trimmed);
    if (!Number.isFinite(seconds) || seconds < 0) {
      throw new AppError("Invalid finishTime", 400);
    }
    return Math.round(seconds * 1000);
  }

  // MM:SS.ms, e.g. 01:15.4 or 1:15.4
  const match = trimmed.match(/^(\d+):(\d{2})(?:\.(\d{1,3}))?$/);
  if (match) {
    const minutes = Number(match[1]);
    const seconds = Number(match[2]);
    const millisStr = match[3] ?? "0";
    const millis = Number(millisStr.padEnd(3, "0"));

    if (
      !Number.isFinite(minutes) ||
      !Number.isFinite(seconds) ||
      !Number.isFinite(millis)
    ) {
      throw new AppError("Invalid finishTime", 400);
    }

    return Math.round((minutes * 60 + seconds) * 1000 + millis);
  }

  throw new AppError(
    "Invalid finishTime format. Use seconds (e.g. 75.32) or MM:SS.ms.",
    400
  );
}

export class LeaderboardService {
  static async getLeaderboard() {
    // This endpoint is public: show only records that have a finish time.
    // finishTimeMs is required in schema, so no need to filter by null.
    const leaderboard = await (prisma as any).result.findMany({
      orderBy: {
        finishTimeMs: "asc",
      },
      include: {
        registration: true,
      },
    });


    return leaderboard.map((r: any) => ({
      registrationId: r.registrationId,
      name: r.registration.name,
      phone: r.registration.phone,
      finishTime: r.finishTime,
      finishTimeMs: r.finishTimeMs,
      updatedAt: r.updatedAt,
    }));
  }

  static async setFinishTime(data: {
    registrationId: string;
    finishTime: string;
  }) {
    const reg = await prisma.registration.findUnique({
      where: { id: data.registrationId },
    });

    if (!reg) {
      throw new AppError("Registration not found", 404);
    }

    const finishTimeMs = parseFinishTimeToSortableMs(data.finishTime);

    const result = await (prisma as any).result.upsert({
      where: {
        registrationId: data.registrationId,
      },
      update: {
        finishTime: data.finishTime,
        finishTimeMs,
      },
      create: {
        registrationId: data.registrationId,
        finishTime: data.finishTime,
        finishTimeMs,
      },
    });

    return result;
  }
}

