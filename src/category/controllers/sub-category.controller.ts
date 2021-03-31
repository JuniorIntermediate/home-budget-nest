import {
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
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { CategoryService } from '../service/category.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from '../dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('category')
@Controller('subCategory')
export class SubCategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCreatedResponse({ description: 'The sub-category has been successfully created.' })
  async postSubCategory(@Body() subCategoryDto: CreateSubCategoryDto) {
    await this.categoryService.createSubCategory(subCategoryDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  @ApiOkResponse({ description: 'The sub-category has been successfully updated.' })
  async updateSubCategory(@Body() subCategoryDto: UpdateSubCategoryDto): Promise<void> {
    await this.categoryService.updateSubCategory(subCategoryDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse({ description: 'The sub-category has been successfully removed.' })
  async deleteSubCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.categoryService.deleteSubCategory(id);
  }
}
