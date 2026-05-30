import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

@Injectable()
export class ValidarPdfPipe implements PipeTransform {
  async transform(files: { [campo: string]: Express.Multer.File[] }) {
    if (!files) return files;

    for (const campo of Object.keys(files)) {
      const archivo = files[campo][0];

      const tipo = await fileTypeFromBuffer(archivo.buffer);

      if (!tipo || tipo.mime !== 'application/pdf') {
        throw new BadRequestException(
          `El archivo en "${campo}" no es un PDF válido aunque tenga extensión .pdf`,
        );
      }
    }

    return files;
  }
}