import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="card flex flex-col gap-2 bg-base-300 p-6 shadow-sm lg:flex-1">
      <h3 className="mb-4 font-bold">Search transaction</h3>
      <div className="w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center justify-center w-10">
            <FiSearch className="text-sm md:text-lg" />
          </div>
          <input
            type="text"
            placeholder="Search by transaction hash (e.g. 0x123...)"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};
