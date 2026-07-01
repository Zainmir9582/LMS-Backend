export class CreateResultDto {
  examName: string;
  studentId: string;
  classId: string;
  courceId?: string | null;
  obtainedMarks: number;
  totalMarks: number;
}
