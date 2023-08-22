import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogObjModule } from './api/log-obj/log-obj.module';
import { DataModule } from './api/data/data.module';
import { ServiceStatusModule } from './api/service-status/service-status.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      keepConnectionAlive: true
   }),
    LogObjModule,
    DataModule,
    ServiceStatusModule
  ],
  controllers: [ AppController ],
  providers: [
    AppService
  ],
})
export class AppModule {}
