import {
  BadRequestException,
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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestUserModel } from '@core/models/request-user.model';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { PayerService } from '../service/payer.service';
import { CreatePayerDto, PayerDto, UpdatePayerDto } from '@payer/dto/payer.dto';
import { PayerValidatorPipe } from '@payer/validators/payer-validator.pipe';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('payer')
@Controller('payers')
export class PayerController {

  constructor(private readonly payerService: PayerService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({ description: 'Return list of payers', isArray: true, type: PayerDto })
  async getPayers(@Req() req: RequestUserModel): Promise<PayerDto[]> {
    return this.payerService.getPayers(req.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOkResponse({ description: 'Return payer', type: PayerDto })
  async getPayer(@Param('id', ParseIntPipe) id: number): Promise<PayerDto> {
    return this.payerService.getPayer(id);
  }

  @UsePipes(new ValidationPipe({ transform: true }), PayerValidatorPipe)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCreatedResponse({ description: 'The payer has been successfully created.', type: PayerDto })
  async postCategory(
    @Req() req: RequestUserModel,
    @Body() payerDto: CreatePayerDto): Promise<PayerDto> {
    return this.payerService.createPayer({ ...payerDto, userId: req.user.id });
  }

  @UsePipes(new ValidationPipe({ transform: true }), PayerValidatorPipe)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiOkResponse({ description: 'The payer has been successfully updated.', type: PayerDto })
  @ApiBadRequestResponse({ description: 'Id provided in body are not equal to params.' })
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestUserModel,
    @Body() payerDto: UpdatePayerDto): Promise<PayerDto> {
    if (id !== payerDto.id) {
      throw new BadRequestException('Id\'s are not equal!');
    }
    return this.payerService.updatePayer({ ...payerDto, userId: req.user.id });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse({ description: 'The payer has been successfully removed.' })
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.payerService.deletePayer(id);
  }
}
