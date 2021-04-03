import { JwtPayload } from '@auth/dto';

export type RequestUserModel = Request & { user: JwtPayload };
