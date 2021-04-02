import { DynamicModule, Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { CategoryRepository } from './repositories/category.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { IS_SMTP_PROVIDER, SENDGRID_API_KEY, SMTP_CONFIG, SMTP_FROM } from './models/constants';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { PayerRepository } from './repositories/payer.repository';
import { Mapper } from './factories/mapper';
import { CurrencyRepository } from './repositories/currency.repository';
import { BudgetRepository } from './repositories/budget.repository';
import { ExpenseRepository } from './repositories/expense.repository';

const repositories = [
  UserRepository,
  PayerRepository,
  CurrencyRepository,
  CategoryRepository,
  BudgetRepository,
  ExpenseRepository
];

const importMailerModuleProvider = IS_SMTP_PROVIDER ? MailerModule.forRoot({
  transport: SMTP_CONFIG,
  defaults: {
    from: SMTP_FROM,
  },
}) : SendGridModule.forRoot({
  apiKey: SENDGRID_API_KEY,
});

const exportMailerModuleProvider = IS_SMTP_PROVIDER ? MailerModule : SendGridModule;

@Global()
@Module({})
export class CoreModule {
  static register(): DynamicModule {
    return {
      module: CoreModule,
      providers: [PrismaService, Mapper, ...repositories],
      imports: [
        importMailerModuleProvider,
      ],
      exports: [PrismaService, Mapper, ...repositories, exportMailerModuleProvider],
    };
  }
}
