import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class CartDto {
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsInt()
  @IsPositive()
  item_id: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsInt()
  @IsPositive()
  price: number;
}
