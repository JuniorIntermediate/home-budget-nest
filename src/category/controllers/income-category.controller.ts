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
import { JwtPayload } from '../../auth/dto/jwt.payload';
import { CreateIncomeCategoryDto, IncomeCategoryDto, UpdateIncomeCategoryDto } from '../dto';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { CategoryService } from '../service/category.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequestUserModel } from '../../core/models/request-user.model';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('category')
@Controller('incomeCategory')
export class IncomeCategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({ description: 'Return list of income categories', isArray: true, type: IncomeCategoryDto })
  async getIncomeCategories(@Req() req: RequestUserModel): Promise<IncomeCategoryDto[]> {
    return this.categoryService.getIncomeCategories(req.user.email);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCreatedResponse({ description: 'The income category has been successfully created.' })
  async postIncomeCategory(
    @Req() req: RequestUserModel,
    @Body() incomeCategoryDto: CreateIncomeCategoryDto) {
    await this.categoryService.createIncomeCategory({ ...incomeCategoryDto, email: req.user.email });
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  @ApiOkResponse({ description: 'The income category has been successfully updated.' })
  async updateIncomeCategory(
    @Req() req: Request & { user: JwtPayload },
    @Body() incomeCategoryDto: UpdateIncomeCategoryDto): Promise<void> {
    await this.categoryService.updateIncomeCategory({ ...incomeCategoryDto, email: req.user.email });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse({ description: 'The income category has been successfully removed.' })
  async deleteIncomeCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.categoryService.deleteIncomeCategory(id);
  }
}
