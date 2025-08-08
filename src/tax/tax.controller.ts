import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { TaxService } from './tax.service';
import { CreateTexDto } from './dto/create-tax.dto';
import { Roles } from 'src/user/decorator/roles.decorator';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('Tax')

@Controller('tex')
export class TaxController {
  constructor(private readonly texService: TaxService) {}

  //  @docs  Can Admin Create Or Update Tax
  //  @Route  POST /api/v1/tex
  //  @access Private [admin]
  @Post()
  @ApiOperation({ summary: 'Create or update tax' })
  @ApiResponse({ status: 201, description: 'Tax created or updated successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(@Body() createTexDto: CreateTexDto) {
    return this.texService.createOrUpdate(createTexDto);
  }

  //  @docs  Can Admin Get Tax
  //  @Route  GET /api/v1/tex
  //  @access Private [admin]
  @Get()
  @ApiOperation({ summary: 'Get tax details' })
  @ApiResponse({ status: 200, description: 'Tax details retrieved successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  find() {
    return this.texService.find();
  }

  //  @docs  Can Admin ReSet Tes
  //  @Route  DELETE /api/v1/tex
  //  @access Private [admin]
  @Delete()
  @ApiOperation({ summary: 'Reset tax details' })
  @ApiResponse({ status: 200, description: 'Tax details reset successfully' })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  reSet() {
    return this.texService.reSet();
  }
}