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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RequestUserModel } from '@core/models/request-user.model';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { CurrencyService } from '@currency/services/currency.service';
import { CreateCurrencyDto, CurrencyDto, UpdateCurrencyDto } from '@currency/dto/currency.dto';
import { CurrencyValidatorPipe } from '@currency/validators/currency-validator.pipe';

@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('currency')
@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({ description: 'Return list of currencies', isArray: true, type: CurrencyDto })
  @ApiOperation({ summary: 'Fetch currencies from database and external api' })
  async getCurrencies(@Req() req: RequestUserModel): Promise<CurrencyDto[]> {
    return this.currencyService.getCurrencies(req.user.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCreatedResponse({ description: 'The currency has been successfully created.', type: CurrencyDto })
  @ApiOperation({ summary: 'Create custom currency for user purpose' })
  @UsePipes(new ValidationPipe({ transform: true }), CurrencyValidatorPipe)
  async postCurrency(
    @Req() req: RequestUserModel,
    @Body() currencyDto: CreateCurrencyDto): Promise<CurrencyDto> {
    return this.currencyService.createCurrency({ ...currencyDto, userId: req.user.id });
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiOkResponse({ description: 'The currency has been successfully updated.', type: CurrencyDto })
  @ApiOperation({ summary: 'Update custom currency' })
  @ApiBadRequestResponse({ description: 'Id provided in body are not equal to params.' })
  @UsePipes(new ValidationPipe({ transform: true }), CurrencyValidatorPipe)
  async updateCurrency(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestUserModel,
    @Body() currencyDto: UpdateCurrencyDto): Promise<CurrencyDto> {
    if (id !== currencyDto.id) {
      throw new BadRequestException('Id\'s are not equal!');
    }
    return this.currencyService.updateCurrency({ ...currencyDto, userId: req.user.id });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse({ description: 'The currency has been successfully removed.' })
  @ApiOperation({ summary: 'Delete custom currency' })
  async deleteCurrency(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.currencyService.deleteCurrency(id);
  }
}
