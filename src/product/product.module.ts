import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './product.schema';
import { Category, categorySchema } from 'src/category/category.schema';
import { SubCategory, subCategorySchema } from 'src/sub-category/sub-category.schema';
import { Brand, brandSchema } from 'src/brand/brand.schema';

@Module({
   imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: productSchema },
      { name: Category.name, schema: categorySchema },
      { name: SubCategory.name, schema: subCategorySchema },
      { name: Brand.name, schema: brandSchema },

    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
