import { TransactionInfo } from "../types/transactionInfo";

import { apiWrapper } from "./apiWrapper";

export const getTxFinalityStatus = async (
  txHash: string,
): Promise<TransactionInfo> => {
  if (!txHash || !/^0x([A-Fa-f0-9]{64})$/.test(txHash)) {
    throw new Error("Invalid EVM transaction hash");
  }

  const response = await apiWrapper(
    "GET",
    `/v1/transaction?hash=${txHash}`,
    "Error fetching transaction finality status",
  );

  return response.data;
};
