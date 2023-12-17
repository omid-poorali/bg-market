import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "application";
import { Icon, Pagination, Table } from "components";
import clsx from "clsx";

const pageSize = 15;

const classes = {
  root: "overflow-auto lg:overflow-visible m-4",
  table: "border-spacing-y-[0.5rem] border-separate",
  th: "whitespace-nowrap border-b-0",
  td: "first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] font-medium whitespace-nowrap"
};

export default function Home() {

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [currentPage, setCurrentPage] = useState(1);

  const store = useStore();

  const filteredData = useMemo(() => (query ? store.coins.filter(([, coin]) => coin.symbol.toLowerCase().indexOf(query.toLowerCase()) > -1) : store.coins), [query, store.coins]);
  const currentTableData = useMemo(() => filteredData.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize), [currentPage, filteredData]);

  return (
    <>
      <div className={classes.root}>
        <Table className={classes.table}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className={classes.th}>
                Product
              </Table.Th>
              <Table.Th className={classes.th}>
                Price
              </Table.Th>
              <Table.Th className={classes.th}>
                24h Change
              </Table.Th>
              <Table.Th className={classes.th}>
                Market
              </Table.Th>
              <Table.Th className={classes.th}>
                24h BaseVolume
              </Table.Th>
              <Table.Th className={classes.th}>
                quoteVolume
              </Table.Th>
              <Table.Th className={classes.th}>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {React.Children.toArray(currentTableData.map(([key, coin]) => (
              <Table.Tr>
                <Table.Td className={clsx(classes.td, "w-60")}>
                  <div className="flex justify-end items-center">
                    <div className="flex justify-center items-center">
                      <a className="text-gray-200 dark:text-darkmode-200" href="">
                        <Icon fill="currentColor" color="currentColor" icon="Star" />
                      </a>
                      <img className="ml-1 w-8 h-8" alt="" src={`https://api.bgcrypto.io/logo/${key}.png`} />
                    </div>
                    <div className="ml-1 flex-grow">{coin.symbol.substring(0, coin.symbol.indexOf("/USDT:USDT"))}</div>
                  </div>
                </Table.Td>
                <Table.Td className={classes.td}>
                  {coin.last}
                </Table.Td>

                <Table.Td className={clsx(classes.td, `${coin.percentage}`.includes("-") ? "text-danger" : "text-success")}>

                  {coin.percentage}

                </Table.Td>
                <Table.Td className={clsx(classes.td, "w-40")}>

                </Table.Td>
                <Table.Td className={classes.td}>
                  {coin.baseVolume}
                </Table.Td>
                <Table.Td className={classes.td}>
                  {coin.quoteVolume}
                </Table.Td>

                <Table.Td className={classes.td}>
                  <a className="flex items-center text-success" href="">
                    Trade
                  </a>
                </Table.Td>
              </Table.Tr>
            )))}
          </Table.Tbody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage} />

    </>
  );
}
