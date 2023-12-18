import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "application";
import { useDebounce } from "hooks";
import { Pagination, SearchField, TabMenu } from "components";
import { HomeTable } from "./Table";

const pageSize = 15;

const tabs: Option[] = [
  { label: "All", value: 0 },
  { label: "Infrastructure", value: 1 },
  { label: "Payments", value: 2 },
  { label: "DeFi", value: 3 },
  { label: "Memes", value: 4 },
  { label: "Web3", value: 5 },
  { label: "Gaming", value: 6 },
]

export function Home() {

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const debouncedQuery = useDebounce(query, 500);

  const [currentPage, setCurrentPage] = useState(1);

  const store = useStore();

  const filteredData = useMemo(() => (debouncedQuery ? store.coins.filter(([, coin]) => coin.symbol.toLowerCase().indexOf(debouncedQuery.toLowerCase()) > -1) : store.coins), [debouncedQuery, store.coins]);
  const currentTableData = useMemo(() => filteredData.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize), [currentPage, filteredData]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ query: event.target.value });
  };

  return (
    <>
      <SearchField fullWidth className="mb-8" defaultValue={query} onChange={handleChange} />
      <div className="flex flex-col md:justify-between md:items-center md:flex-row">
        <TabMenu defaultValue={0} options={tabs} />
        <div className="flex items-center gap-1 md:mt-0 mt-10">
          <div className="w-6 h-6 rounded-full border-primary dark:border-white border relative cursor-pointer" >
          </div><label className="m-0 font-normal text-base dark:text-[#ffffff33]">Available for Trading</label>
        </div>
      </div>
      <div className="my-4">
        <p className="text-xl font-semibold">BG Market Watch</p>
        <p className="darrk:text-[#ffffff66] font-normal text-base opacity-60">Find promising coins and great opportunities! </p>
      </div>
      <HomeTable className="hidden md:table" data={currentTableData} />
      <HomeTable className="md:hidden" data={filteredData} />
      <Pagination
        className="hidden md:flex mb-4"
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage} />
    </>
  );
}
