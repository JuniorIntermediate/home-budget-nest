import {
  BadRequestException,
  Body,
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
} from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CategoryService } from '../service/category.service';
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
import { RequestUserModel } from '../../core/models/request-user.model';
import { CategoryDto } from '../dto';
import { CategoryTypeEnum } from '../enums/category-type.enum';
import { BaseCategoryDto, CreateBaseCategoryDto, UpdateBaseCategoryDto } from '../dto/base-category.dto';

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
    @Query('type') type: CategoryTypeEnum,
    @Req() req: RequestUserModel,
  ): Promise<BaseCategoryDto[]> {
    return this.categoryService.getProperCategories(req.user.email, type);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create category of proper type (if provided)' })
  @ApiCreatedResponse({ description: 'The category has been successfully created.', type: CategoryDto })
  async postCategory(
    @Req() req: RequestUserModel,
    @Body() categoryDto: CreateBaseCategoryDto): Promise<BaseCategoryDto> {
    return this.categoryService.createProperCategory({ ...categoryDto, email: req.user.email });
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiOperation({ summary: 'Update category of proper type (if provided)' })
  @ApiOkResponse({ description: 'The category has been successfully updated.', type: CategoryDto })
  @ApiBadRequestResponse({ description: 'Id provided in body are not equal to params.' })
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestUserModel,
    @Body() categoryDto: UpdateBaseCategoryDto): Promise<BaseCategoryDto> {
    if (id !== categoryDto.id) {
      throw new BadRequestException('Id\'s are not equal!');
    }
    return this.categoryService.updateProperCategory({ ...categoryDto, email: req.user.email });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete category of proper type (if provided)' })
  @ApiNoContentResponse({ description: 'The category has been successfully removed.' })
  async deleteCategory(
    @Query('type') type: CategoryTypeEnum,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.categoryService.deleteProperCategory(id, type);
  }

}
