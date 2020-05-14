export class CreateRequestDto {
  readonly reason: string;
  readonly status: number;
  readonly start: Date;
  readonly end: Date;
}