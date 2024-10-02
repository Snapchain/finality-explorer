import { LatestBlockInfo } from "../types/blockInfo";

import { apiWrapper } from "./apiWrapper";

export const getLatestBlockInfo = async (): Promise<LatestBlockInfo> => {
  const response = await apiWrapper(
    "GET",
    `/v1/latestBlockInfo`,
    "Error fetching latest block info",
  );

  return response.data;
};
