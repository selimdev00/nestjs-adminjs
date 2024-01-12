import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsBoolean({ message: 'IsCompleted must be a boolean value' })
  isCompleted: boolean;
}
