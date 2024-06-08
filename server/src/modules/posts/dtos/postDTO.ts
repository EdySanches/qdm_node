import { IsEmail, IsInt, IsOptional, IsString, Length, IsDate } from 'class-validator';

export class postDTO {
    @IsOptional()
    @IsInt()
    id?: number;  

    @IsInt()
    user_id?: number;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    title?: string;

    @IsOptional()
    @IsString()
    @Length(1, 1000)
    post_description?: string;

    @IsOptional()
    @IsInt()
    views?: number;

    @IsOptional()
    @IsInt()
    likes?: number;

    @IsOptional()
    @IsInt()
    dislikes?: number;

    @IsOptional()
    @IsString()
    @Length(1, 500)
    image_url?: string;

    @IsOptional()
    @IsDate()
    created_at?: Date;

    @IsOptional()
    @IsDate()
    updated_at?: Date;

}
