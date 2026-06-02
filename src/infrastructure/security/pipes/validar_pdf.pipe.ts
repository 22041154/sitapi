import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidarPdfPipe implements PipeTransform {

  async transform(
    files: { [campo: string]: Express.Multer.File[] },
  ) {

    if (!files) {
      return files;
    }

    for (const campo of Object.keys(files)) {

      const archivo = files[campo][0];

      const esPdf =
        archivo.buffer
          .subarray(0, 4)
          .toString('ascii') === '%PDF';

      if (!esPdf) {
        throw new BadRequestException(
          `El archivo en "${campo}" no es un PDF válido.`,
        );
      }
    }

    return files;
  }

}