import { Ship } from '../../ships/ship.entity';

export interface ShipDto {
  id: number;
  name: string;
  crewCount: number;
  yearBuilt: number;
  captain?: {
    id: number;
    name: string;
  };
  currentDock?: {
    id: number;
    number: number;
    capacity: number;
  };
  dockedAt?: Date;
}

export interface CreateShipDto {
  name: string;
  crewCount: number;
  yearBuilt: number;
  captainId?: number;
  dockId?: number;
}

export const toShipDto = (ship: Ship): ShipDto => ({
  id: ship.id,
  name: ship.name,
  crewCount: ship.crewCount,
  yearBuilt: ship.yearBuilt,
  captain: ship.captain
    ? {
        id: ship.captain.id,
        name: ship.captain.name,
      }
    : undefined,
  currentDock: ship.currentDock
    ? {
        id: ship.currentDock.id,
        number: ship.currentDock.number,
        capacity: ship.currentDock.capacity,
      }
    : undefined,
  dockedAt: ship.dockedAt,
});
