import { Response } from './../response.entity';

export class CreateResponseDto {
  readonly reason: string;
  readonly status: number;
  readonly request: Response;
}