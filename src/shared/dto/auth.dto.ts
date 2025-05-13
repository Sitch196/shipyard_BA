export class UserDto {
  id: number;
  email: string;
  name: string;
  isShipyardOwner: boolean;
}

export class LoginResponseDto {
  access_token: string;
  user: UserDto;
}

export class JwtPayloadDto {
  email: string;
  sub: number;
  isShipyardOwner: boolean;
}
