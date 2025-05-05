import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from '../../users/user.entity';
import { Ship } from '../../ships/ship.entity';

@Entity()
export class Dock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  capacity: number;

  @ManyToOne(() => Users, (user) => user.docks)
  shipyardOwner: Users;

  @OneToMany(() => Ship, (ship) => ship.currentDock)
  ships: Ship[];
}
