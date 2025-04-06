import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShipDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  crewCount: number;

  @IsNumber()
  @IsNotEmpty()
  yearBuilt: number;

  @IsNumber()
  @IsNotEmpty()
  dockId: number;
}
