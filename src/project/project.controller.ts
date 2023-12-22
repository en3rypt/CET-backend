import {
  Body,
  Controller,
  UseGuards,
  Request,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { UserService } from 'src/user/user.service';
import { AddUserDto } from './dto/addUser.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,  ) {}

    @UseGuards(AuthGuard('jwt'))
  @Post()
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
