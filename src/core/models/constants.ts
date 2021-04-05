import { EmailProviderEnum } from '@core/models/email-provider.enum';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expirationTime: process.env.JWT_EXPIRES,
};

export const SMTP_CONFIG = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};
export const SMTP_FROM = process.env.SMTP_FROM;

export const WEB_URL = {
  base: process.env.BASE_APP_URL,
  verification: process.env.APP_VERIFICATION_ENDPOINT,
  forgotPassword: process.env.APP_FORGOT_PASSWORD_ENDPOINT,
};

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const SENDGRID_EMAIL_FROM = process.env.SENDGRID_FROM;
export const MAIL_PROVIDER = process.env.MAIL_PROVIDER;
export const IS_SMTP_PROVIDER = MAIL_PROVIDER === EmailProviderEnum.SMTP;
export const CURRENCY_EXTERNAL_API = process.env.CURRENCY_EXTERNAL_API;
export const DEFAULT_CURRENCY = {
  currency: process.env.DEFAULT_CURRENCY,
  exchangeRate: Number(process.env.DEFAULT_EXCHANGE_RATE),
};
