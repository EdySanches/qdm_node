import { IsEmail, IsInt, IsOptional, IsString, Length, IsDate, MaxLength, Min } from 'class-validator';

export class postDTO {
    @IsOptional()
    @IsInt()
    user_id?: number;
  
    @IsString()
    @MaxLength(100)
    title: string;
  
    @IsString()
    post_description: string;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    views?: number;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    likes?: number;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    dislikes?: number;
  
    @IsOptional()
    @MaxLength(500)
    image_url?: string;
  
}
