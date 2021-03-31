import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { CreateExpenseDto, ExpenseDto } from '../dto/expense.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestUserModel } from '../../core/models/request-user.model';
import { JwtGuard } from '../../auth/guards/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('expense')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Add income / expense' })
  @ApiCreatedResponse({ description: 'The income / expense has been successfully added.', type: ExpenseDto })
  create(
    @Req() req: RequestUserModel,
    @Body() createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    return this.expenseService.createExpense({ ...createExpenseDto, email: req.user.email });
  }
}
