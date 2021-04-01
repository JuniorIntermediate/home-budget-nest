import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import {
  CreateExpenseDto,
  ExpenseDto,
  ExpensePaginationDto,
  GroupExpenseDto,
  GroupExpenseQueryDto,
} from '../dto/expense.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RequestUserModel } from '../../core/models/request-user.model';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { QueryParamsDto } from '../dto/query-params.dto';
import { plainToClass } from 'class-transformer';
import { QueryValidatorPipe } from '../validators/query-validators.pipe';
import { CreateExpenseValidatorPipe } from '../validators/create-expense-validator.pipe';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('expense')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {
  }

  @UsePipes(CreateExpenseValidatorPipe)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Add income / expense' })
  @ApiCreatedResponse({ description: 'The income / expense has been successfully added.', type: ExpenseDto })
  create(
    @Req() req: RequestUserModel,
    @Body() createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    return this.expenseService.createExpense({ ...createExpenseDto, email: req.user.email });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get expenses (optional filtering)' })
  @ApiOkResponse({ description: 'Return expenses.', type: ExpensePaginationDto })
  @ApiQuery({
    required: false,
    type: QueryParamsDto,
  })
  @Get()
  @UsePipes(QueryValidatorPipe)
  getExpenses(
    @Query() query: QueryParamsDto,
  ): Promise<ExpensePaginationDto> {
    return this.expenseService.getExpenses(plainToClass(QueryParamsDto, query));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get expenses grouped by month' })
  @ApiOkResponse({ description: 'Return grouped expenses.', type: GroupExpenseDto })
  @ApiQuery({
    required: false,
    type: GroupExpenseQueryDto,
  })
  @Get('group-month')
  async getExpensesGroupedByMonth(
    @Query() query: GroupExpenseQueryDto,
  ): Promise<GroupExpenseDto[]> {
    return this.expenseService.getExpensesGroupedByMonth(plainToClass(GroupExpenseQueryDto, query));
  }
}
