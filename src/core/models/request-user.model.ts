import { JwtPayload } from '../../auth/dto/jwt.payload';

export type RequestUserModel = Request & { user: JwtPayload };
