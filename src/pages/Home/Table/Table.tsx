import React from 'react';
import { Store } from 'application';
import { Icon, Table } from "components";
import clsx from "clsx";
import * as Utils from "utils";

const classes = {
    table: "border-collapse",
    tr: "rounded border border-solid border-[#92b7b3] dark:border-[#92b7b3] dark:bg-gradient-to-r dark:from-[#0c65fd1a] dark:from-[16.66%] dark:to-[#020913] dark:to-[113.92%]",
    th: "whitespace-nowrap border-b-0",
    td: "font-medium whitespace-nowrap border-b-0"
};

type CustomProps = {
    data: Store["coins"];
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'table'>, keyof CustomProps>

export const HomeTable = (props: PropsType) => {
    const {
        data,
        ...rest
    } = props;

    return (
        <Table className={classes.table} {...rest}>
            <Table.Thead>
                <Table.Tr className={classes.tr}>
                    <Table.Th className={classes.th}>
                        Product
                    </Table.Th>
                    <Table.Th className={classes.th}>
                        Price
                    </Table.Th>
                    <Table.Th className={classes.th}>
                        24h Change
                    </Table.Th>
                    <Table.Th className={clsx(classes.th, "hidden lg:table-cell")}>
                        Market
                    </Table.Th>
                    <Table.Th className={clsx(classes.th, "hidden md:table-cell")}>
                        24h BaseVolume
                    </Table.Th>
                    <Table.Th className={clsx(classes.th, "hidden md:table-cell")}>
                        quoteVolume
                    </Table.Th>
                    <Table.Th className={clsx(classes.th, "hidden md:table-cell")}>
                        Actions
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {React.Children.toArray(data.map(([key, coin]) => (
                    <Table.Tr>
                        <Table.Td className={classes.td}>
                            <div className="w-40 flex justify-end items-center py-4">
                                <div className="flex justify-center items-center text-gray-200 dark:text-darkmode-200 cursor-pointer">
                                    <Icon fill="currentColor" color="currentColor" icon="Star" />
                                    <img className="ml-1 w-6 h-6" alt="" src={`https://api.bgcrypto.io/logo/${key}.png`} />
                                </div>
                                <div className="ml-1 flex-grow">{coin.symbol.substring(0, coin.symbol.indexOf("/USDT:USDT"))}</div>
                            </div>
                        </Table.Td>
                        <Table.Td className={classes.td}>
                            {Utils.Number.format(coin.last, "$0.00a")}
                        </Table.Td>
                        <Table.Td className={clsx(classes.td, `${coin.percentage}`.includes("-") ? "text-danger" : "text-success")}>
                            {Utils.Number.format(coin.percentage, "0.00")}
                        </Table.Td>
                        <Table.Td className={clsx(classes.th, "hidden lg:table-cell")}>
                        </Table.Td>
                        <Table.Td className={clsx(classes.th, "hidden md:table-cell")}>
                            {Utils.Number.format(coin.baseVolume, "0.00a")}
                        </Table.Td>
                        <Table.Td className={clsx(classes.th, "hidden md:table-cell")}>
                            {Utils.Number.format(coin.quoteVolume, "0.00a")}
                        </Table.Td>
                        <Table.Td className={clsx(classes.td, "hidden md:table-cell text-success cursor-pointer")}>
                            Trade
                        </Table.Td>
                    </Table.Tr>
                )))}
            </Table.Tbody>
        </Table>
    );
};