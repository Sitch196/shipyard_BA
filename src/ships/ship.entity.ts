import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../users/user.entity';
import { Dock } from '../docks/entities/dock.entity';

@Entity()
export class Ship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  crewCount: number;

  @Column()
  yearBuilt: number;

  @ManyToOne(() => Users, (user) => user.ships)
  captain: Users;

  @ManyToOne(() => Dock, (dock) => dock.ships)
  currentDock: Dock;

  @Column({ nullable: true })
  dockedAt: Date;
}
