import {
  BadRequestException,
  Body, ClassSerializerInterceptor,
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
  UseGuards, UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BudgetService } from '@budget/services/budget.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BudgetDto, CreateBudgetDto, UpdateBudgetDto } from '@budget/dto/budget.dto';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { RequestUserModel } from '@core/models/request-user.model';

@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('budget')
@Controller('budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: 'Get budgets' })
  @ApiOkResponse({
    description: 'Return list of budgets',
    isArray: true,
    type: BudgetDto,
  })
  async getBudgets(@Req() req: RequestUserModel): Promise<BudgetDto[]> {
    return this.budgetService.getBudgets(req.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Get budget' })
  @ApiOkResponse({
    description: 'Return budget',
    type: BudgetDto,
  })
  async getBudget(@Param('id', ParseIntPipe) id: number): Promise<BudgetDto> {
    return this.budgetService.getBudget(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create budget' })
  @ApiCreatedResponse({ description: 'The budget has been successfully created.', type: BudgetDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Req() req: RequestUserModel,
    @Body() createBudgetDto: CreateBudgetDto,
  ): Promise<BudgetDto> {
    return this.budgetService.createBudget({ ...createBudgetDto, userId: req.user.id });
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiOperation({ summary: 'Update budget' })
  @ApiOkResponse({ description: 'The budget has been successfully updated.', type: BudgetDto })
  @ApiBadRequestResponse({ description: 'Id provided in body are not equal to params.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Req() req: RequestUserModel,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    if (id !== updateBudgetDto.id) {
      throw new BadRequestException('Id\'s are not equal!');
    }
    return this.budgetService.updateBudget({ ...updateBudgetDto, userId: req.user.id });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete budget' })
  @ApiNoContentResponse({ description: 'The category has been successfully removed.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.budgetService.deleteBudget(id);
  }
}
