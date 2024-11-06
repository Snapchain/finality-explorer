import Image from "next/image";

import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <nav>
      <div className="bg-base-300 shadow-sm">
        <div className="container mx-auto flex w-full items-center justify-between gap-4 p-6 pb-4 md:pb-6">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Tohma" width={40} height={40} />
            <p className="text-xl font-bold">Tohma Finality Explorer</p>
          </div>
          <div className="flex items-center gap-4">
            {/* This modal can be enabled in development to display the connected FG RPC address */}
            {/* <RPCModal /> */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
