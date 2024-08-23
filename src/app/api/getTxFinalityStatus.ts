import { TransactionInfo } from "../types/transactionInfo";

import { apiWrapper } from "./apiWrapper";

export const getTxFinalityStatus = async (
  txHash: string,
): Promise<TransactionInfo> => {
  if (!txHash) {
    throw new Error("No transaction hash provided");
  }

  const response = await apiWrapper(
    "GET",
    `/v1/transaction?hash=${txHash}`,
    "Error fetching transaction finality status",
  );

  return response.data;
};
