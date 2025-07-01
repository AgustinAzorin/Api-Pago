import { ValidateCuitDTO } from "../dtos/validate-cuit.dto";

export class SoapService {
  validateCuit(dto: ValidateCuitDTO): string {
    // simulación: validamos CUIT ficticio
    const isValid = dto.cuit.length === 11;

    const xmlResponse = `
      <?xml version="1.0" encoding="UTF-8"?>
      <ValidacionCUIT>
        <cuit>${dto.cuit}</cuit>
        <valido>${isValid}</valido>
      </ValidacionCUIT>
    `.trim();

    return xmlResponse;
  }
}
