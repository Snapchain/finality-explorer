"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

import { getTxFinalityStatus } from "./api/getTxFinalityStatus";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ErrorModal } from "./components/Modals/ErrorModal";
import { PrivacyModal } from "./components/Modals/Privacy/PrivacyModal";
import { TermsModal } from "./components/Modals/Terms/TermsModal";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Transaction } from "./components/Transaction/Transaction";
import { useError } from "./context/Error/ErrorContext";
import { usePrivacy } from "./context/Privacy/PrivacyContext";
import { useTerms } from "./context/Terms/TermsContext";
import { ErrorState } from "./types/errors";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    error,
    isErrorOpen,
    showError,
    hideError,
    retryErrorAction,
    noCancel,
    handleError,
  } = useError();
  const { isTermsOpen, closeTerms } = useTerms();
  const { isPrivacyOpen, closePrivacy } = usePrivacy();

  const {
    data: txInfo,
    // = {
    //   txHash:
    //     "0x3abdfa3b184c1362ad046f578fa21896851cf5020c1bd8ee6839a136c17ebf26",
    //   blockNumber: "95583",
    //   blockHash:
    //     "0x6eaaf89e37c4b71d90cf2645efef1b887c5e361149f9a9134bc4ab974631f612",
    //   timestamp: "22 August 2024 at 13:44:08",
    //   status: FinalityStatus.BTC_FINALIZED,
    //   babylonFinalized: true,
    // },
    isLoading: isLoadingTxInfo,
    error: txInfoError,
    isError: isTxInfoError,
    refetch: refetchTxInfo,
  } = useQuery({
    queryKey: ["transaction", searchTerm],
    queryFn: async () => {
      const txInfo = await getTxFinalityStatus(searchTerm);
      return txInfo;
    },
    refetchInterval: 60000, // 1 minute
    // Should be enabled only when the wallet is connected
    enabled: !!searchTerm,
    retry: (failureCount, error) => {
      return !isErrorOpen && failureCount <= 3;
    },
  });

  useEffect(() => {
    handleError({
      error: txInfoError,
      hasError: isTxInfoError,
      errorState: ErrorState.SERVER_ERROR,
      refetchFunction: refetchTxInfo,
    });
  }, [isTxInfoError, txInfoError, refetchTxInfo, handleError]);

  return (
    <main className={`relative h-full min-h-svh w-full main-app-background`}>
      <Header />
      <div className="container mx-auto flex justify-center p-6">
        <div className="container flex flex-col gap-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {txInfo || isLoadingTxInfo ? (
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
