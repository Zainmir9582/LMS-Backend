export class UpdateFeeDto {
  fee?: number; // total fee amount
  receiveFee?: number; // amount received
  remainingFee?: number; // remaining amount to be paid
  feeStatus?: 'paid' | 'partial' | 'unpaid';
  paperFund?: number;
  receiptNo?: string | null;
  paidAt?: Date;
  student?: string | null; // allow null to detach
  class?: string | null; // class id
  cource?: string | null; // course id
} 