interface RPCModalProps {}

export const RPCModal: React.FC<RPCModalProps> = () => {
  const rpcAddress = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="outline-none items-stretch hidden sm:flex">
      <div className="flex items-center rounded-lg border border-primary bg-[#fdf2ec] p-2 dark:border-white dark:bg-base-200 text-sm">
        {rpcAddress}
      </div>
    </div>
  );
};
