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
import { BudgetService } from '../services/budget.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BudgetDto, CreateBudgetDto, UpdateBudgetDto } from '../dto/budget.dto';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { RequestUserModel } from '../../core/models/request-user.model';

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
    return this.budgetService.getBudgets(req.user.email);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create budget' })
  @ApiCreatedResponse({ description: 'The budget has been successfully created.', type: BudgetDto })
  create(@Body() createBudgetDto: CreateBudgetDto): Promise<BudgetDto> {
    return this.budgetService.createBudget(createBudgetDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiOperation({ summary: 'Update budget only once per month. (It reset current value)' })
  @ApiOkResponse({ description: 'The budget has been successfully updated.', type: BudgetDto })
  @ApiBadRequestResponse({ description: 'Id provided in body are not equal to params.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.updateBudget(updateBudgetDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete budget' })
  @ApiNoContentResponse({ description: 'The category has been successfully removed.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.budgetService.deleteBudget(id);
  }
}
