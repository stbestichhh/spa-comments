import { BadRequestException, Injectable } from '@nestjs/common';
import * as process from 'node:process';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as sharp from 'sharp';

interface FileJob {
  file: Express.Multer.File;
  resolve: (filePath: string) => void;
  reject: (error: any) => void;
}

@Injectable()
export class QueueService {
  private queue: FileJob[] = [];
  private processing = false;
  private uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir);
    }
  }

  public async addJob(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      this.queue.push({ file, resolve, reject });
      this.processNext();
    });
  }

  private async processNext() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;
    const job = this.queue.shift();
    if (!job) return;

    try {
      const filePath = await this.handleFile(job.file);
      job.resolve(filePath);
    } catch (error) {
      job.reject(error);
    } finally {
      this.processing = false;
      this.processNext();
    }
  }

  private async handleFile(file: Express.Multer.File): Promise<string> {
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = Date.now() + '_' + file.originalname;
    const filePath = path.join(this.uploadDir, filename);

    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      const image = sharp(file.buffer);
      const metadata = await image.metadata();

      if ((metadata.width ?? 0) > 320 || (metadata.height ?? 0) > 240) {
        await image.resize(320, 240, { fit: 'inside' }).toFile(filePath);
      } else {
        await sharp(file.buffer).toFile(filePath);
      }

      return filePath;
    }

    if (ext === '.txt') {
      if (file.size > 100 * 1024) {
        throw new BadRequestException(`Text file is too large (max 100kb)`);
      }

      await fs.promises.writeFile(filePath, file.buffer);
      return filePath;
    }

    throw new BadRequestException(`Unsupported file type`);
  }
}
