import { Request, Response } from "express";
import { SoapService } from "../services/soap.service";
import { ValidateCuitDTO } from "../dtos/validate-cuit.dto";

const soapService = new SoapService();

export class SoapController {
  static validateCuit(req: Request, res: Response) {
    const { cuit } = req.body;

    if (!cuit) {
      return res.status(400).json({ message: "El campo cuit es obligatorio." });
    }

    const dto: ValidateCuitDTO = { cuit };

    try {
      const xml = soapService.validateCuit(dto);
      res.type("application/xml").send(xml);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message || "Error en validación SOAP." });
    }
  }
}
