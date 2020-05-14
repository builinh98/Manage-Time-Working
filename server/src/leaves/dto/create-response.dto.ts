import { Request } from './../request.entity';

export class CreateResponseDto {
  readonly reason: string;
  readonly status: number;
  readonly request: Request;
}