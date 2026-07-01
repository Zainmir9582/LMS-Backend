export class FeeSummaryDto {
  studentId: string;
  classId?: string;
  courceId?: string | null;
  studentName: string;
  className: string;
  courceName?: string | null;
  totalFee: number; // from student.fee
  totalPaid: number; // sum of fee payments
  remaining: number; // totalFee - totalPaid
  status: 'paid' | 'partial' | 'unpaid';
} 