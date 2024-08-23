import Image from "next/image";

import { shouldDisplayTestingMsg } from "@/config";

import { Logo } from "../Logo/Logo";
import { RPCModal } from "../Modals/RPCModal";
import { TestingInfo } from "../TestingInfo/TestingInfo";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <nav>
      <div className="bg-base-300 shadow-sm">
        <div className="container mx-auto flex w-full items-center justify-between gap-4 p-6 pb-4 md:pb-6">
          <div className="flex items-center gap-4">
            <Logo />
            <span className=" text-3xl font-thin">×</span>
            <Image
              src="/snapchain-logo.jpg"
              alt="Snapchain"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <RPCModal />
            <ThemeToggle />
          </div>
        </div>
      </div>
      {shouldDisplayTestingMsg() && (
        <div className="container mx-auto flex w-full items-center p-6 pb-0">
          <TestingInfo />
        </div>
      )}
    </nav>
  );
};
