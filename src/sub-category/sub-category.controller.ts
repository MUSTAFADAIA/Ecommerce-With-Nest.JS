import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCreateCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { Roles } from 'src/user/decorator/roles.decorator';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiTags('Sub Category')
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  //  @docs   Admin Can create a new sub category
  //  @Route  POST /api/v1/sub-category
  //  @access Private [Amdin]
  @Post()
  @ApiOperation({ summary: 'Create a new sub-category' })
  @ApiResponse({ status: 201, description: 'Sub-category created successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    subCreateCategoryDto: SubCreateCategoryDto,
  ) {
    return this.subCategoryService.create(subCreateCategoryDto);
  }

  //  @docs   Any User Can get sub categorys
  //  @Route  GET /api/v1/sub-category
  //  @access Public
  @Get()
  @ApiOperation({ summary: 'Get all sub-categories' })
  @ApiResponse({ status: 200, description: 'Sub-categories retrieved successfully' })
  findAll() {
    return this.subCategoryService.findAll();
  }

  //  @docs   Any User Can get any sub category
  //  @Route  GET /api/v1/sub-category/:id
  //  @access Public
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific sub-category by ID' })
  @ApiResponse({ status: 200, description: 'Sub-category retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  //  @docs   Admin Can update any sub category
  //  @Route  UPDATE /api/v1/sub-category/:id
  //  @access Private [Amdin]
  @Patch(':id')
  @ApiOperation({ summary: 'Update a sub-category' })
  @ApiResponse({ status: 200, description: 'Sub-category updated successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    UpdateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoryService.update(id, UpdateSubCategoryDto);
  }

  //  @docs   Admin Can delete any sub category
  //  @Route  DELETE /api/v1/sub-category/:id
  //  @access Private [Amdin]
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sub-category' })
  @ApiResponse({ status: 200, description: 'Sub-category deleted successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(id);
  }
}