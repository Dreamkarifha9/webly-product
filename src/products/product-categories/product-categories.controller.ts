import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Req,
} from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductCategoryDto } from './dto/product-category.dto';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.interface';

@ApiTags('Products - Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) { }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateProductCategoryDto })
  @ApiCreatedResponse({
    description: 'ProductCategoryDto has created successfully.',
    type: ProductCategoryDto,
  })
  @ApiBadGatewayResponse({ description: 'Bad Gateway.' })
  @ApiInternalServerErrorResponse({ description: 'INTERNAL SERVER ERROR' })
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    createProductCategoryDto.createdBy = 'system';
    return this.productCategoriesService.create(createProductCategoryDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'A successful response.',
    type: [ProductCategoryDto],
  })
  findAll() {
    return this.productCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'A successful response.',
    type: ProductCategoryDto,
  })
  findOne(@Param('id') id: string) {
    return this.productCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'ProductCategoryDto has created successfully.',
    type: ProductCategoryDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    updateProductCategoryDto.updatedBy = 'system';
    return this.productCategoriesService.update(id, updateProductCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'ProductCategoryDto has delete successfully.',
    type: Boolean,
  })
  delete(@Param('id') id: string) {
    return this.productCategoriesService.delete(id);
  }
}
