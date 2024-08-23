import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

import { TransactionInfo } from "@/app/types/transactionInfo";
import { trim } from "@/utils/trim";

import { LoadingSmall } from "../Loading/Loading";

interface TransactionProps {
  transaction: TransactionInfo | undefined;
}

export const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const status = (tx: TransactionInfo) => {
    switch (tx.status) {
      case "pending":
        return "Pending";
      case "unsafe":
        return "Unsafe";
      case "btc finalized":
        return "BTC Finalized";
      case "safe":
        return "Safe";
      case "finalized":
        return "Finalized";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="card flex flex-col gap-6 lg:gap-4 bg-base-300 p-6 shadow-sm items-start overflow-hidden">
      <h3 className="font-bold">Transaction status</h3>
      <Entry
        title="Status"
        value={transaction ? status(transaction) : undefined}
        tooltipId="tooltip-transaction-status"
        tooltip="Transaction status (pending, unsafe, btc finalized, safe, finalized)"
      />
      <Entry
        title="Babylon finalized"
        value={
          transaction
            ? transaction.babylonFinalized
              ? "Yes"
              : "No"
            : undefined
        }
        tooltipId="tooltip-btc-finalized"
        tooltip="Transaction status (pending, unsafe, btc finalized, safe, finalized)"
      />
      <div className="divider divider-vertical m-0" />
      <Entry
        title="Transaction hash"
        value={transaction?.txHash ?? undefined}
        tooltipId="tooltip-transaction-hash"
        tooltip="L2 transaction hash"
      />
      <Entry
        title="Timestamp"
        value={transaction?.timestamp ?? undefined}
        tooltipId="tooltip-timestamp"
        tooltip="Timestamp of the transaction"
      />
      <Entry
        title="Block number"
        value={transaction?.blockNumber ?? undefined}
        tooltipId="tooltip-block-number"
        tooltip="Block transaction is included in"
      />
      <Entry
        title="Block hash"
        value={transaction?.blockHash ?? undefined}
        tooltipId="tooltip-block-hash"
        tooltip="Hash of block transaction is included in"
      />
    </div>
  );
};

const Entry = ({
  title,
  value,
  tooltipId,
  tooltip,
}: {
  title: string;
  value: string | undefined;
  tooltipId: string;
  tooltip: string;
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-sm items-start">
      <div className="flex gap-1 items-center">
        <p className="dark:text-neutral-content">{title}</p>
        <span
          className="cursor-pointer text-xs"
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltip}
          data-tooltip-place="right"
        >
          <AiOutlineInfoCircle />
        </span>
        <Tooltip id={tooltipId} className="tooltip-wrap" />
      </div>
      <div className="flex items-center gap-1">
        {!!value ? (
          <>
            <p className="whitespace-nowrap font-semibold hidden md:block">
              {value}
            </p>
            <p className="whitespace-nowrap font-semibold md:hidden">
              {value.length > 40 ? trim(value, 20) : value}
            </p>
          </>
        ) : (
          <LoadingSmall text="Loading..." />
        )}
      </div>
    </div>
  );
};
