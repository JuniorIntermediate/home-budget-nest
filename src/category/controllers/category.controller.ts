import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { CategoryService } from '@category/service/category.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { RequestUserModel } from '@core/models/request-user.model';
import { BaseCategoryDto, CategoryDto, CreateBaseCategoryDto, UpdateBaseCategoryDto } from '@category/dto';
import { CategoryTypeEnum } from '@category/enums/category-type.enum';
import { CategoryValidatorPipe } from '@category/validators/category-validator.pipe';
import { CategoryEnumValidatorPipe } from '@category/validators/category-enum-validator.pipe';

@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: 'Get categories of proper type (if provided)' })
  @ApiQuery({
    name: 'type',
    enum: [CategoryTypeEnum.INCOME, CategoryTypeEnum.OUTCOME],
    required: false,
    description: 'Get specific category type.',
  })
  @ApiOkResponse({
    description: 'Return list of categories',
    isArray: true,
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(BaseCategoryDto),
        },
        {
          $ref: getSchemaPath(CategoryDto),
        },
      ],
    },
  })
  async getCategories(
    @Query('type', CategoryEnumValidatorPipe) type: CategoryTypeEnum,
    @Req() req: RequestUserModel,
  ): Promise<BaseCategoryDto[]> {
    return this.categoryService.getProperCategories(req.user.id, type);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Get category of proper type (if provided)' })
  @ApiQuery({
    name: 'type',
    enum: [CategoryTypeEnum.INCOME, CategoryTypeEnum.OUTCOME],
    required: false,
    description: 'Get specific category type.',
  })
  @ApiOkResponse({
    description: 'Return category',
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(BaseCategoryDto),
        },
        {
          $ref: getSchemaPath(CategoryDto),
        },
      ],
    },
  })
  async getCategory(
    @Query('type', CategoryEnumValidatorPipe) type: CategoryTypeEnum,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseCategoryDto> {
    return this.categoryService.getProperCategory(id, type);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create category of proper type (if provided)' })
  @ApiCreatedResponse({ description: 'The category has been successfully created.', type: CategoryDto })
  @UsePipes(new ValidationPipe({ transform: true }), CategoryValidatorPipe)
  async postCategory(
    @Req() req: RequestUserModel,
    @Body() categoryDto: CreateBaseCategoryDto): Promise<BaseCategoryDto> {
    return this.categoryService.createProperCategory({ ...categoryDto, userId: req.user.id });
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiOperation({ summary: 'Update category of proper type (if provided)' })
  @ApiOkResponse({ description: 'The category has been successfully updated.', type: CategoryDto })
  @ApiBadRequestResponse({ description: 'Id provided in body are not equal to params.' })
  @UsePipes(new ValidationPipe({ transform: true }), CategoryValidatorPipe)
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestUserModel,
    @Body() categoryDto: UpdateBaseCategoryDto): Promise<BaseCategoryDto> {
    if (id !== categoryDto.id) {
      throw new BadRequestException('Id\'s are not equal!');
    }
    return this.categoryService.updateProperCategory({ ...categoryDto, userId: req.user.id });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete category of proper type (if provided)' })
  @ApiNoContentResponse({ description: 'The category has been successfully removed.' })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: [CategoryTypeEnum.INCOME, CategoryTypeEnum.OUTCOME],
  })
  async deleteCategory(
    @Query('type', CategoryEnumValidatorPipe) type: CategoryTypeEnum,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.categoryService.deleteProperCategory(id, type);
  }

}
