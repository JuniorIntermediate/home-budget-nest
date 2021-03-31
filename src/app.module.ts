import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { CategoryModule } from './category/category.module';
import { PayerModule } from './payer/payer.module';

@Module({
  imports: [CoreModule.register(), AuthModule, CategoryModule, PayerModule],
})
export class AppModule {}
