import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import hpp from "hpp";

import registrationRoutes from "./modules/registration/registration.routes";
import authRoutes from "./modules/auth/auth.routes";
import authMiddleware from "./common/middleware/authMiddleware";
import adminRoutes from "./modules/admin/admin.routes";
import leaderboardRoutes from "./modules/leaderboard/leaderboard.routes";

import errorHandler from "./common/middleware/errorHandler";

import rateLimiter from "./common/middleware/rateLimiter";

const app = express();

// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? ["https://racehub-backend-6ydb.onrender.com/api"]
//         : "*",

//     credentials: true,
//   })
// );

app.use(cors())

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  morgan(
    process.env.NODE_ENV === "production"
      ? "combined"
      : "dev"
  )
);

app.use(compression());

app.use(rateLimiter);

app.use(hpp());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.get(
  "/api/admin/protected",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Protected route accessed",
    });
  }
);

app.use("/api", registrationRoutes);
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", leaderboardRoutes);

app.use(errorHandler);


export default app;