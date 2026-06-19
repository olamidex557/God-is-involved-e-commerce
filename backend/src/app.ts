import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import uploadRoutes from "./routes/upload.routes";
import adminRoutes from "./routes/admin.routes";
import orderRoutes from "./routes/order.routes";
import userRoutes from "./routes/user.routes";
import activityRoutes from "./routes/activity.routes";
import quoteRoutes from "./routes/quote.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get(
  "/",
  (_, res) => {
    res.json({
      success: true,
      message:
        "God Is Involved API Running",
    });
  }
);

app.use(
  "/api/quotes",
  quoteRoutes
);

app.use(
  "/api/activity",
  activityRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/users",
  userRoutes
);

export default app;