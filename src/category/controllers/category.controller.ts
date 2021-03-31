import {
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
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { CategoryService } from '../service/category.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequestUserModel } from '../../core/models/request-user.model';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({ description: 'Return list of categories', isArray: true, type: CategoryDto })
  async getCategories(@Req() req: RequestUserModel): Promise<CategoryDto[]> {
    return this.categoryService.getCategories(req.user.email);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCreatedResponse({ description: 'The category has been successfully created.' })
  async postCategory(
    @Req() req: RequestUserModel,
    @Body() categoryDto: CreateCategoryDto) {
    await this.categoryService.createCategory({ ...categoryDto, email: req.user.email });
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  @ApiOkResponse({ description: 'The category has been successfully updated.' })
  async updateCategory(
    @Req() req: RequestUserModel,
    @Body() categoryDto: UpdateCategoryDto): Promise<void> {
    await this.categoryService.updateCategory({ ...categoryDto, email: req.user.email });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse({ description: 'The category has been successfully removed.' })
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}
