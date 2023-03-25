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
  Logger,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
import { ProductDto } from './dto/product.dto';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.interface';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  private readonly logger: Logger = new Logger(ProductsController.name);
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({
    description: 'ShopProduct has created successfully.',
    type: ProductDto,
  })
  @ApiBadGatewayResponse({ description: 'Bad Gateway.' })
  @ApiInternalServerErrorResponse({ description: 'INTERNAL SERVER ERROR' })
  async create(
    @Body() body: CreateProductDto,
    @Req() request: RequestWithUser,
  ) {
    const { username } = request.user;

    this.logger.debug('username', username);
    this.logger.debug('body', JSON.stringify(body));

    return this.productsService.create(body);
  }

  @Get()
  @ApiOkResponse({
    description: 'A successful response.',
    type: [ProductDto],
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'A successful response.',
    type: ProductDto,
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    updateProductDto.updatedBy = 'system';
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
