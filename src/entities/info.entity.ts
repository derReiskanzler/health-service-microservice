import { LogObj } from './log-obj.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HttpMethod } from '../models/http-method.model';
import { ServiceName } from '../models/service-name.model';

@Entity()
export class Info {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    selfServiceName!: ServiceName;

    @Column({ nullable: true })
    otherServiceName?: ServiceName;

    @Column({ nullable: true })
    httpMethod?: HttpMethod;

    @Column({ nullable: true })
    statusCode?: number;

    @Column()
    requestedUrl!: string;

    @Column()
    timestamp!: string;

    @OneToOne(type => LogObj, logObj => logObj.info)
    logObj!: LogObj;
}

