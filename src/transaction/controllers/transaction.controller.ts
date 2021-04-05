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
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from '@transaction/services/transaction.service';
import {
  CreateTransactionDto,
  GroupTransactionDto,
  GroupTransactionQueryDto,
  TransactionDto,
  TransactionPaginationDto,
} from '@transaction/dto/transaction.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RequestUserModel } from '@core/models/request-user.model';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { QueryParamsDto } from '@transaction/dto/query-params.dto';
import { QueryValidatorPipe } from '@transaction/validators/query-validators.pipe';
import { CreateTransactionValidatorPipe } from '@transaction/validators/create-transaction-validator.pipe';

@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('transaction')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {
  }

  @UsePipes(new ValidationPipe({ transform: true }), CreateTransactionValidatorPipe)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Add income / expense' })
  @ApiCreatedResponse({ description: 'The income / expense has been successfully added.', type: TransactionDto })
  createTransaction(
    @Req() req: RequestUserModel,
    @Body() createTransactionDto: CreateTransactionDto): Promise<TransactionDto> {
    return this.transactionService.createTransaction({ ...createTransactionDto, userId: req.user.id });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get transactions (optional filtering)' })
  @ApiOkResponse({ description: 'Return transactions.', type: TransactionPaginationDto })
  @ApiQuery({
    required: false,
    type: QueryParamsDto,
  })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }), QueryValidatorPipe)
  getTransactions(
    @Query() query: QueryParamsDto,
  ): Promise<TransactionPaginationDto> {
    return this.transactionService.getTransactions(query);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get transactions grouped by month' })
  @ApiOkResponse({ description: 'Return grouped transactions.', type: GroupTransactionDto })
  @ApiQuery({
    required: false,
    type: GroupTransactionQueryDto,
  })
  @Get('group-by')
  async getTransactionsGroupedByMonth(
    @Query(new ValidationPipe({ transform: true })) query: GroupTransactionQueryDto,
  ): Promise<GroupTransactionDto[]> {
    return this.transactionService.getTransactionsGroupedByMonth(query);
  }
}
