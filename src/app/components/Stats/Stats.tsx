import Image from "next/image";
import { Fragment } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

import { ChainSyncStatus } from "@/app/types/chainSyncStatus";

import blockIcon from "./icons/block.svg";

interface StatsProps {
  chainSyncStatus: ChainSyncStatus | undefined;
}

export const Stats: React.FC<StatsProps> = ({ chainSyncStatus }) => {
  const sections = [
    [
      {
        title: "Latest",
        value: chainSyncStatus?.latest_block,
        icon: blockIcon,
        tooltip: "Latest L2 block number",
      },
      {
        title: "ETH Finalized",
        value: chainSyncStatus?.latest_eth_finalized_block,
        icon: blockIcon,
        tooltip: "Latest ETH finalized L2 block number",
      },
      {
        title: "Earliest BTC Finalized",
        value: chainSyncStatus?.earliest_btc_finalized_block,
        icon: blockIcon,
        tooltip: "Earliest consecutively BTC finalized L2 block number",
      },
      {
        title: "Latest BTC Finalized",
        value: chainSyncStatus?.latest_btc_finalized_block,
        icon: blockIcon,
        tooltip: "Latest BTC finalized L2 block number",
      },
    ],
  ];

  return (
    <div className="card flex flex-col gap-4 bg-base-300 p-1 shadow-sm lg:flex-row lg:justify-between">
      <div className="flex items-center gap-2 md:flex-1 md:flex-col lg:flex-initial lg:flex-row flex-wrap justify-center p-5">
        <strong>Block Status</strong>
      </div>
      {sections.map((section, index) => (
        <div
          key={index}
          className="card flex justify-between bg-base-400 p-4 text-sm md:flex-row"
        >
          {section.map((subSection, subIndex) => (
            <Fragment key={subSection.title}>
              <div className="flex items-center gap-2 md:flex-1 md:flex-col lg:flex-initial lg:flex-row flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <Image src={subSection.icon} alt={subSection.title} />
                  <div className="flex items-center gap-1">
                    <p className="dark:text-neutral-content">
                      {subSection.title}
                    </p>
                    {subSection.tooltip && (
                      <>
                        <span
                          className="cursor-pointer text-xs"
                          data-tooltip-id={`tooltip-${subSection.title}`}
                          data-tooltip-content={subSection.tooltip}
                          data-tooltip-place="top"
                        >
                          <AiOutlineInfoCircle />
                        </span>
                        <Tooltip
                          id={`tooltip-${subSection.title}`}
                          className="tooltip-wrap"
                        />
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <p className="flex-1 text-right">
                    {!!chainSyncStatus ? (
                      <strong>{subSection.value}</strong>
                    ) : (
                      <span className="loading loading-spinner text-primary" />
                    )}
                  </p>
                </div>
              </div>
              {subIndex !== section.length - 1 && (
                <div className="divider mx-0 my-2 md:divider-horizontal" />
              )}
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};
