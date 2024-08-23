export type TransactionInfo = {
  txHash: string;
  blockTimestamp: string;
  blockHeight: string;
  blockHash: string;
  status: FinalityStatus;
  babylonFinalized: boolean;
};

export enum FinalityStatus {
  PENDING = "pending",
  UNSAFE = "unsafe",
  BTC_FINALIZED = "btc finalized",
  SAFE = "safe",
  FINALIZED = "finalized",
}
