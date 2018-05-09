import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../auth/passport/jwt.secret';

import { Get, Post, Put, Delete, Controller, Body, Param, Headers, HttpException, HttpStatus } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

import { UsersService } from './users.service';

import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Users')
@Controller('api/v1/users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ title: 'Create User' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ title: 'Get All Users' })
  @ApiResponse({ status: 200, description: 'The list of users has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiOperation({ title: 'Get Current User' })
  @ApiResponse({ status: 200, description: 'The current user has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findMe(@Headers() headers): Promise<User> {
    // TODO validation pipe for token
    const token = headers['authorization'].split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.decode(token, jwtSecret());
        if (decoded.email) {
          return this.usersService.findMe(decoded.email);
        }
      } catch (e) {
        throw new HttpException('Malformed Token', HttpStatus.FORBIDDEN);
      }
    }
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single User by id' })
  @ApiResponse({ status: 200, description: 'The single user has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single User by id' })
  @ApiResponse({ status: 200, description: 'The single user has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneAndUpdate(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return this.usersService.update(id, createUserDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete Single User by id' })
  @ApiResponse({ status: 200, description: 'The single user has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.usersService.delete(id);
  }

}
