import { DynamicModule, Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { CategoryRepository } from './repositories/category.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { IS_SMTP_PROVIDER, SENDGRID_API_KEY, SMTP_CONFIG, SMTP_FROM } from './models/constants';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';

const repositories = [
  UserRepository,
  CategoryRepository
];

const importMailerModuleProvider = IS_SMTP_PROVIDER ? MailerModule.forRoot({
  transport: SMTP_CONFIG,
  defaults: {
    from: SMTP_FROM
  }
}) : SendGridModule.forRoot({
  apiKey: SENDGRID_API_KEY
});

const exportMailerModuleProvider = IS_SMTP_PROVIDER ? MailerModule : SendGridModule;

@Global()
@Module({})
export class CoreModule {
  static register(): DynamicModule {
    return {
      module: CoreModule,
      providers: [PrismaService, ...repositories],
      imports: [
        importMailerModuleProvider
      ],
      exports: [PrismaService, ...repositories, exportMailerModuleProvider]
    };
  }
}
