import {
  Body,
  Controller,
  UseGuards,
  Request,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { CreateProjectDto } from './dto/createProject.dto';
import { UserService } from 'src/user/user.service';
import { AddUserDto } from './dto/addUser.dto';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createProject(
    @Request() req,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<any> {
    const createdProject = await this.projectService.createProject(
      createProjectDto,
      req.user,
    );
    return createdProject;
  }

  @Put()
  @UseGuards(AuthGuard)
  async addUser(
    @Body()
    addUserDto: AddUserDto,
  ) {
    return await this.projectService.addUserToProject(
      addUserDto.email,
      addUserDto.projectId,
    );
  }
}
