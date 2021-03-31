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
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequestUserModel } from '../../core/models/request-user.model';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { PayerService } from '../service/payer.service';
import { CreatePayerDto, PayerDto, UpdatePayerDto } from '../dto/payer.dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('payer')
@Controller('payer')
export class PayerController {

  constructor(private readonly payerService: PayerService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({ description: 'Return list of payers', isArray: true, type: PayerDto })
  async getPayers(@Req() req: RequestUserModel): Promise<PayerDto[]> {
    return this.payerService.getPayers(req.user.email);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCreatedResponse({ description: 'The payer has been successfully created.' })
  async postCategory(
    @Req() req: RequestUserModel,
    @Body() payerDto: CreatePayerDto) {
    await this.payerService.createPayer({ ...payerDto, email: req.user.email });
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  @ApiOkResponse({ description: 'The payer has been successfully updated.' })
  async updateCategory(
    @Req() req: RequestUserModel,
    @Body() payerDto: UpdatePayerDto): Promise<void> {
    await this.payerService.updatePayer({ ...payerDto, email: req.user.email });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse({ description: 'The payer has been successfully removed.' })
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.payerService.deletePayer(id);
  }
}
