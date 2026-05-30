import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

export const FiltroPdf = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  const extensionesPermitidas = /\.(pdf)$/i;
  const mimesPermitidos = ['application/pdf'];

  const extensionValida = extensionesPermitidas.test(file.originalname);
  const mimeValido = mimesPermitidos.includes(file.mimetype);

  if (!extensionValida || !mimeValido) {
    return callback(
      new BadRequestException(
        `Archivo "${file.originalname}" no permitido. Solo se aceptan archivos PDF.`
      ),
      false,
    );
  }

  callback(null, true);
};