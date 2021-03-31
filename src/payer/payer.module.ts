import { Module } from '@nestjs/common';
import { PayerController } from './controllers/payer.controller';
import { PayerService } from './service/payer.service';

@Module({
  controllers: [PayerController],
  providers: [PayerService]
})
export class PayerModule {}
