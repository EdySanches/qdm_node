import { IsInt, IsOptional, IsString, IsDate } from 'class-validator';

export class commentDTO {
  @IsInt()
  user_id: number;

  @IsInt()
  post_id: number;

  @IsInt()
  post_owner_id: number;

  @IsString()
  comment_description: string;

  @IsOptional()
  @IsString()
  comment_status?: string;

  @IsOptional()
  @IsDate()
  created_at?: Date;

  @IsOptional()
  @IsDate()
  updated_at?: Date;
}
