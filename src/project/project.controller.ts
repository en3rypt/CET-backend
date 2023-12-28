import {
  Body,
  Controller,
  UseGuards,
  Request,
  Post,
  Put,
  Get,
  Param,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { UserService } from 'src/user/user.service';
import { AddUserDto } from './dto/addUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { getProjectDto } from './dto/getProject.dto';
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

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

  @UseGuards(AuthGuard('jwt'))
  @Get('/:projectId')
  async getProject(
    @Param('projectId') projectId: string,
    @Request() req,
  ): Promise<any> {
    return await this.projectService.getProject(req.user.userId, projectId);
  }

  @UseGuards(AuthGuard('jwt'))
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

  // @UseGuards(AuthGuard('jwt'))
  // @Get('/stats/:projectId')
  // async getProjectStats(
  //   @Param('projectId') projectId: string,
  //   @Request() req,
  // ): Promise<any> {
  //   return await this.projectService.getProjectStats(
  //     req.user.userId,
  //     projectId,
  //   );
  // }
}
