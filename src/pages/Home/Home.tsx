import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "application";
import { useDebounce } from "hooks";
import { Pagination } from "components";
import { HomeTable } from "./Table";
import { Filter } from "./Filter";

const pageSize = 15;

export function Home() {

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const defaultPage = Number(searchParams.get("page"));
  const currentPage = defaultPage > 0 ? defaultPage : 1;

  const debouncedQuery = useDebounce(query, 500);

  const updateSearchParam = useCallback((update: { [key: string]: string }) => {
    setSearchParams({ page: `${currentPage}`, query, ...update })
  }, [currentPage, query, setSearchParams]);

  const handelPageChange = (targetPage: number) => {
    updateSearchParam({ page: `${targetPage}` });
  };

  const store = useStore();

  const filteredData = useMemo(() => (debouncedQuery ? store.coins.filter(([, coin]) => coin.symbol.toLowerCase().indexOf(debouncedQuery.toLowerCase()) > -1) : store.coins), [debouncedQuery, store.coins]);
  const currentTableData = useMemo(() => filteredData.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize), [currentPage, filteredData]);

  return (
    <>
      <Filter query={query} updateSearchParam={updateSearchParam} />
      <div className="my-4">
        <p className="text-xl font-semibold">BG Market Watch</p>
        <p className="darrk:text-[#ffffff66] font-normal text-base opacity-60">Find promising coins and great opportunities! </p>
      </div>
      {/* desktop table */}
      <HomeTable className="hidden md:table" data={currentTableData} />
      {/* mobile table */}
      <HomeTable className="md:hidden" data={filteredData} />
      <Pagination
        className="hidden md:flex mb-4"
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={pageSize}
        onPageChange={handelPageChange} />
    </>
  );
}
