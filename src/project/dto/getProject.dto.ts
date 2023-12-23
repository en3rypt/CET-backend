import { IsNotEmpty } from "class-validator";

export class getProjectDto{
    @IsNotEmpty()
    readonly projectId: string;
}