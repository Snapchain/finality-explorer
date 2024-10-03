import { ChainSyncStatus } from "../types/chainSyncStatus";

import { apiWrapper } from "./apiWrapper";

export const getChainSyncStatus = async (): Promise<ChainSyncStatus> => {
  const response = await apiWrapper(
    "GET",
    `/v1/chainSyncStatus`,
    "Error fetching chain sync status",
  );

  return response.data;
};
