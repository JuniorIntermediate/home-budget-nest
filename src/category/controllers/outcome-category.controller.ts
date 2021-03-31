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
import { CreateOutcomeCategoryDto, OutcomeCategoryDto, UpdateOutcomeCategoryDto } from '../dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('category')
@Controller('outcomeCategory')
export class OutcomeCategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({ description: 'Return list of outcome categories', isArray: true, type: OutcomeCategoryDto })
  async getOutcomeCategories(@Req() req: RequestUserModel): Promise<OutcomeCategoryDto[]> {
    return this.categoryService.getOutcomeCategories(req.user.email);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCreatedResponse({ description: 'The outcome category has been successfully created.' })
  async postOutcomeCategory(
    @Req() req: RequestUserModel,
    @Body() outcomeCategoryDto: CreateOutcomeCategoryDto) {
    await this.categoryService.createOutcomeCategory({ ...outcomeCategoryDto, email: req.user.email });
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  @ApiOkResponse({ description: 'The outcome category has been successfully updated.' })
  async updateOutcomeCategory(
    @Req() req: RequestUserModel,
    @Body() outcomeCategoryDto: UpdateOutcomeCategoryDto): Promise<void> {
    await this.categoryService.updateOutcomeCategory({ ...outcomeCategoryDto, email: req.user.email });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse({ description: 'The outcome category has been successfully removed.' })
  async deleteOutcomeCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.categoryService.deleteOutcomeCategory(id);
  }
}
