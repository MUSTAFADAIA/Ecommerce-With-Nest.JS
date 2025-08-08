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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Roles } from 'src/user/decorator/roles.decorator';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('Brand')

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  //  @docs   Admin Can create a new Brand
  //  @Route  POST /api/v1/brand
  //  @access Private [Amdin]
  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiResponse({ status: 200, description: 'Brand Create successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    createBrandDto: CreateBrandDto,
  ) {
    return this.brandService.create(createBrandDto);
  }

  //  @docs   Any User Can get all Brands
  //  @Route  GET /api/v1/brand
  //  @access Public
  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, description: 'List of all brands' })
  findAll() {
    return this.brandService.findAll();
  }

  //  @docs   Any User Can get single Brand
  //  @Route  GET /api/v1/brand
  //  @access Public
  @Get(':id')
  @ApiOperation({ summary: 'Get a brand by ID' })
  @ApiResponse({ status: 200, description: 'Brand details' })
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  //  @docs   Admin can update a Brand
  //  @Route  PATCH /api/v1/brand
  //  @access Private [admin]
  @Patch(':id')
  @ApiOperation({ summary: 'Update a brand by ID' })
  @ApiResponse({ status: 200, description: 'Brand updated successfully' })
  @Roles(['admin'])

  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  //  @docs   Admin can delete a Brand
  //  @Route  DELETE /api/v1/brand
  //  @access Private [admin]
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand by ID' })
  @ApiResponse({ status: 200, description: 'Brand deleted successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
