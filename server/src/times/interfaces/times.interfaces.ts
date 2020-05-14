export class TimeResponse {
  readonly absent: string;
  readonly hours: number;
}

export class DashboardResponse {
  readonly date: string;
  readonly working: number;
  readonly leave: number;
}

export class WorkingResponse {
  date: Date;
  time: number;
}