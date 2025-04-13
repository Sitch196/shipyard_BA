import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ship } from '../ships/ship.entity';
import { Dock } from '../docks/entities/dock.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: false })
  isShipyardOwner: boolean;

  @OneToMany(() => Ship, (ship) => ship.captain)
  ships: Ship[];

  @OneToMany(() => Dock, (dock) => dock.shipyardOwner)
  docks: Dock[];
}
