import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";

// rutas
import authRoutes from "./routes/auth.routes";
import accountRoutes from "./routes/account.routes";
import transferRoutes from "./routes/transfer.routes";
import reportRoutes from "./routes/report.routes";
import soapRoutes from "./routes/soap.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./utils/swagger.json";




// middlewares
// import { authMiddleware } from "./middlewares/auth.middleware"; // descomentar cuando funcione bien

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// Servir el frontend estático (public)
app.use(express.static(path.join(__dirname, "../public")));

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use("/api", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/soap", soapRoutes);

// Error handler genérico
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor." });
});

export default app;
