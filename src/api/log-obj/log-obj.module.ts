import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogObj } from '../../entities/log-obj.entity';
import { Info } from '../../entities/info.entity';
import { LogObjService } from './service/log-obj.service';
import { LogObjController } from './controller/log-obj.controller';

@Module({
    imports: [
      TypeOrmModule.forFeature([LogObj, Info]),
    ],
    providers: [ LogObjService ],
    controllers: [ LogObjController ]
  })
  export class LogObjModule {}
