/// <reference path="../types/express/index.d.ts" />
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No se encontró el token de autenticación." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // opcionalmente podrías añadir:
    req.user = decoded; // podés tipar user luego con interface si querés
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ message: "Token inválido o vencido." });
  }
};
