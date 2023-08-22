import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { Info } from './info.entity';

@Entity()
export class LogObj {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(type => Info, info => info.logObj,{
        cascade: true,
    })
    @JoinColumn()
    info!: Info;

}