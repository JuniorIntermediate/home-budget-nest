import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CategoryService } from '../service/category.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateSubcategoryDto, UpdateSubcategoryDto } from '../dto';
import { CategoryTypeEnum } from '../enums/category-type.enum';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('category')
@Controller('categories/:categoryId/subcategories')
export class SubcategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCreatedResponse({ description: 'The subcategory has been successfully created.' })
  async postSubCategory(
    @Param('categoryId', ParseIntPipe) parentId: number,
    @Body() subCategoryDto: CreateSubcategoryDto,
  ) {
    if (parentId !== subCategoryDto.parentId) {
      throw new BadRequestException('Id\'s are not equal!');
    }
    await this.categoryService.createProperCategory(subCategoryDto, CategoryTypeEnum.SUBCATEGORY);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiOkResponse({ description: 'The subcategory has been successfully updated.' })
  async updateSubCategory(
    @Param('categoryId', ParseIntPipe) parentId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() subCategoryDto: UpdateSubcategoryDto,
  ): Promise<void> {
    if (parentId !== subCategoryDto.parentId && id !== subCategoryDto.id) {
      throw new BadRequestException('Id\'s are not equal!');
    }
    await this.categoryService.updateProperCategory(subCategoryDto, CategoryTypeEnum.SUBCATEGORY);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse({ description: 'The subcategory has been successfully removed.' })
  async deleteSubCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.categoryService.deleteProperCategory(id, CategoryTypeEnum.SUBCATEGORY);
  }
}
