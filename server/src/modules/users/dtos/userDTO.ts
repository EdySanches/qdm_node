import { IsEmail, IsInt, IsOptional, IsString, Length, IsDate } from 'class-validator';

export class userDTO {
  @IsString()
  @Length(1, 100)
  user_name: string;

  @IsEmail()
  @Length(1, 100)
  user_email: string;

  @IsOptional()
  @IsInt()
  user_type?: number;

  @IsDate()
  last_login: Date;

  @IsString()
  @Length(1, 100)
  user_passw: string;

  @IsOptional()
  @IsDate()
  created_at?: Date;

  @IsOptional()
  @IsDate()
  updated_at?: Date;
}
