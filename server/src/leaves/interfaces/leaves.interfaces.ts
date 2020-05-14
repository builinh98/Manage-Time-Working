export class AbsencesResponse {
  date: string;
  from: string;
  to: string;
  hours: number
}

export class LeavesResponse {
  absences: AbsencesResponse[];
  totalAbsence: number;
}