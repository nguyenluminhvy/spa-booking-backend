import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY')
    private cloudinary: typeof Cloudinary,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = this.cloudinary.uploader.upload_stream(
        { folder: 'nestjs_uploads' },
        (error, result) => {
          if (error) return reject(error);

          if (!result) {
            return reject(new Error('Upload failed: result is undefined'));
          }

          resolve(result);
        },
      );

      upload.end(file.buffer);
    });
  }
}
