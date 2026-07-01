import { extname } from 'path';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

export const multerOptions = {
  fileFilter: (req: any, file: any, callback: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req, file, callback) => {
      const lastDotIndex = file.originalname.lastIndexOf('.');

      const name = file.originalname.substring(0, lastDotIndex);
      const ext = file.originalname.substring(lastDotIndex + 1);
      const newName = name.replaceAll(' ', '_') + '_' + Date.now() + '.' + ext;
      callback(null, newName);
    },
  }),
};
