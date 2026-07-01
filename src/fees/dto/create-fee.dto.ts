export class CreateFeeDto {
  fee: number; // total fee amount
  receiveFee: number; // amount received
  remainingFee: number; // remaining amount to be paid
  feeStatus: 'paid' | 'partial' | 'unpaid';
  paperFund?: number; // optional, default 0
  receiptNo?: string | null;
  paidAt: Date;
  date?: Date;
  student: string; // student id
  class: string; // class id
  cource?: string | null; // course id
} 