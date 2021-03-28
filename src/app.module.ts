import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule.register(), AuthModule],
})
export class AppModule {
}
