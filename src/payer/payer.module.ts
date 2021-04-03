import { Module } from '@nestjs/common';
import { PayerController } from '@payer/controllers/payer.controller';
import { PayerService } from '@payer/service/payer.service';
import { PayerValidatorPipe } from '@payer/validators/payer-validator.pipe';

@Module({
  controllers: [PayerController],
  providers: [PayerValidatorPipe, PayerService],
})
export class PayerModule {
}
