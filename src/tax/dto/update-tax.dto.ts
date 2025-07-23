import { PartialType } from '@nestjs/mapped-types';
import { CreateTexDto } from './create-tax.dto';

export class UpdateTaxDto extends PartialType(CreateTexDto) {}
