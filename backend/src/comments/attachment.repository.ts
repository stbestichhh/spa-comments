import { AbstractRepository } from 'nest-sequelize-repository';
import { AttachmentModel } from '../database/models/attachment.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AttachmentRepository extends AbstractRepository<AttachmentModel> {
  constructor(
    @InjectModel(AttachmentModel)
    private readonly model: typeof AttachmentModel,
  ) {
    super(model, {
      idField: 'attachment_id',
      autoGenerateId: true,
    });
  }
}
