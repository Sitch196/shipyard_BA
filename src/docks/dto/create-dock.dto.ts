import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDockDto {
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;
}
