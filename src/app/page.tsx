"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { getChainSyncStatus } from "./api/getChainSyncStatus";
import { getTxFinalityStatus } from "./api/getTxFinalityStatus";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { LoadingSmall } from "./components/Loading/Loading";
import { ErrorModal } from "./components/Modals/ErrorModal";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Stats } from "./components/Stats/Stats";
import { Transaction } from "./components/Transaction/Transaction";
import { useError } from "./context/Error/ErrorContext";
import { ChainSyncStatus } from "./types/chainSyncStatus";
import { ErrorState } from "./types/errors";
import { TransactionInfo } from "./types/transactionInfo";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    error,
    isErrorOpen,
    hideError,
    retryErrorAction,
    noCancel,
    handleError,
  } = useError();
  const [refetchInterval, setRefetchInterval] = useState<number | undefined>(
    undefined,
  );

  const {
    data: chainSyncStatus,
    error: chainSyncStatusError,
    isError: isChainSyncStatusError,
    refetch: refetchChainSyncStatus,
  } = useQuery({
    queryKey: ["chainSyncStatus"],
    queryFn: async () => {
      const chainSyncStatus = await getChainSyncStatus();
      return chainSyncStatus;
    },
    refetchInterval: 10000, // 10 seconds
    // will try refetching for RETRY_COUNT times before giving up
    // user can trigger a retry action in the error modal that pops up
    retry: (failureCount, error) => {
      const RETRY_COUNT = 3;
      return !isErrorOpen && failureCount <= RETRY_COUNT;
    },
  });

  const {
    data: txInfo,
    isLoading: isLoadingTxInfo,
    error: txInfoError,
    isError: isTxInfoError,
    refetch: refetchTxInfo,
  } = useQuery<TransactionInfo>({
    queryKey: ["transaction", searchTerm],
    queryFn: async () => {
      const txInfo = await getTxFinalityStatus(searchTerm);
      return txInfo;
    },
    refetchInterval: refetchInterval,
    enabled: !!searchTerm && /^0x([A-Fa-f0-9]{64})$/.test(searchTerm),
    // will try refetching for RETRY_COUNT times before giving up
    // user can trigger a retry action in the error modal that pops up
    retry: (failureCount, error) => {
      const RETRY_COUNT = 3;
      return !isErrorOpen && failureCount <= RETRY_COUNT;
    },
  });

  // refetch every REFETCH_INTERVAL_IN_MS / 1000 seconds if not yet babylon finalized
  useEffect(() => {
    const REFETCH_INTERVAL_IN_MS = 2000;
    setRefetchInterval(
      !txInfo || txInfo?.babylonFinalized ? undefined : REFETCH_INTERVAL_IN_MS,
    );
  }, [txInfo]);

  useEffect(() => {
    handleError({
      error: txInfoError,
      hasError: isTxInfoError,
      errorState: ErrorState.SERVER_ERROR,
      refetchFunction: refetchTxInfo,
    });
    handleError({
      error: chainSyncStatusError,
      hasError: isChainSyncStatusError,
      errorState: ErrorState.SERVER_ERROR,
      refetchFunction: refetchChainSyncStatus,
    });
  }, [
    isTxInfoError,
    txInfoError,
    refetchTxInfo,
    handleError,
    isChainSyncStatusError,
    chainSyncStatusError,
    refetchChainSyncStatus,
  ]);

  return (
    <main className={`relative h-full min-h-svh w-full main-app-background`}>
      <Header />
      <Suspense fallback={<LoadingSmall text="Loading..." />}>
        <Content
          chainSyncStatus={chainSyncStatus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          txInfo={txInfo}
          isLoadingTxInfo={isLoadingTxInfo}
        />
      </Suspense>
      <Footer />
      <ErrorModal
        open={isErrorOpen}
        errorMessage={error.message}
        errorState={error.errorState}
        errorTime={error.errorTime}
        onClose={hideError}
        onRetry={retryErrorAction}
        noCancel={noCancel}
      />
    </main>
  );
};

interface ContentProps {
  chainSyncStatus: ChainSyncStatus | undefined;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  txInfo: TransactionInfo | undefined;
  isLoadingTxInfo: boolean;
}

const Content: React.FC<ContentProps> = ({
  chainSyncStatus,
  searchTerm,
  setSearchTerm,
  txInfo,
  isLoadingTxInfo,
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const txHash = searchParams.get("txHash");
    if (txHash) {
      setSearchTerm(txHash);
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto flex justify-center p-6">
      <div className="container flex flex-col gap-6">
        <Stats chainSyncStatus={chainSyncStatus} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {!!searchTerm ? (
          <Transaction transaction={txInfo} isLoading={isLoadingTxInfo} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
