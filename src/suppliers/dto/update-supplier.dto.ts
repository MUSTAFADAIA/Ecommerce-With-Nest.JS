import { PartialType } from '@nestjs/mapped-types';
import { CreateSuppliersDto } from './create-supplier.dto';

export class UpdateSupplierDto extends PartialType(CreateSuppliersDto) {}
