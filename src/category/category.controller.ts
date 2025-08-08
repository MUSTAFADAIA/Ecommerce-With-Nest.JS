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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiTags('Category')
@Controller('category')
export class CategoryController { 
  constructor(private readonly categoryService: CategoryService) {}

  //  @docs   Admin Can create a new category
  //  @Route  POST /api/v1/category
  //  @access Private [Amdin]
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.create(createCategoryDto);
  }

  //  @docs   Any User Can get categorys
  //  @Route  GET /api/v1/category
  //  @access Public
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  findAll() {
    return this.categoryService.findAll();
  }

  //  @docs   Any User Can get any category
  //  @Route  GET /api/v1/category/:id
  //  @access Public
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific category by ID' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  //  @docs   Admin Can update any category
  //  @Route  UPDATE /api/v1/category/:id
  //  @access Private [Amdin]
  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  //  @docs   Admin Can delete any category
  //  @Route  DELETE /api/v1/category/:id
  //  @access Private [Amdin]
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' }) 
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}