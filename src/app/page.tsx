"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getLatestBlockInfo } from "./api/getLatestBlockInfo";
import { getTxFinalityStatus } from "./api/getTxFinalityStatus";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ErrorModal } from "./components/Modals/ErrorModal";
import { PrivacyModal } from "./components/Modals/Privacy/PrivacyModal";
import { TermsModal } from "./components/Modals/Terms/TermsModal";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Stats } from "./components/Stats/Stats";
import { Transaction } from "./components/Transaction/Transaction";
import { useError } from "./context/Error/ErrorContext";
import { usePrivacy } from "./context/Privacy/PrivacyContext";
import { useTerms } from "./context/Terms/TermsContext";
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
  const { isTermsOpen, closeTerms } = useTerms();
  const { isPrivacyOpen, closePrivacy } = usePrivacy();
  const [refetchInterval, setRefetchInterval] = useState<number | undefined>(
    undefined,
  );

  const {
    data: latestBlockInfo,
    error: latestBlockInfoError,
    isError: isLatestBlockInfoError,
    refetch: refetchLatestBlockInfo,
  } = useQuery({
    queryKey: ["latestBlockInfo"],
    queryFn: async () => {
      const latestBlockInfo = await getLatestBlockInfo();
      return latestBlockInfo;
    },
    refetchInterval: 10000, // 10 seconds
    // Should be enabled only when the wallet is connected
    retry: (failureCount, error) => {
      return !isErrorOpen && failureCount <= 3;
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
    retry: (failureCount, error) => {
      return !isErrorOpen && failureCount <= 3;
    },
  });

  useEffect(() => {
    setRefetchInterval(!txInfo || txInfo?.babylonFinalized ? undefined : 2000); // refetch every 2 secs if not yet babylon finalized
  }, [txInfo]);

  useEffect(() => {
    handleError({
      error: txInfoError,
      hasError: isTxInfoError,
      errorState: ErrorState.SERVER_ERROR,
      refetchFunction: refetchTxInfo,
    });
    handleError({
      error: latestBlockInfoError,
      hasError: isLatestBlockInfoError,
      errorState: ErrorState.SERVER_ERROR,
      refetchFunction: refetchLatestBlockInfo,
    });
  }, [
    isTxInfoError,
    txInfoError,
    refetchTxInfo,
    handleError,
    isLatestBlockInfoError,
    latestBlockInfoError,
    refetchLatestBlockInfo,
  ]);

  return (
    <main className={`relative h-full min-h-svh w-full main-app-background`}>
      <Header />
      <div className="container mx-auto flex justify-center p-6">
        <div className="container flex flex-col gap-6">
          <Stats latestBlockInfo={latestBlockInfo} />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {txInfo && !isLoadingTxInfo ? (
            <Transaction transaction={txInfo} />
          ) : (
            <></>
          )}
        </div>
      </div>
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
      <TermsModal open={isTermsOpen} onClose={closeTerms} />
      <PrivacyModal open={isPrivacyOpen} onClose={closePrivacy} />
    </main>
  );
};

export default Home;
