import { createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";

interface TableProps extends React.PropsWithChildren, React.ComponentPropsWithoutRef<"table"> {
    dark?: boolean;
}

const tableContext = createContext<{
    dark: TableProps["dark"];
}>({
    dark: false,
});
export function Table({
    className,
    dark,
    ...props
}: TableProps) {
    return (
        <tableContext.Provider
            value={{
                dark: dark
            }}
        >
            <table
                className={twMerge([
                    "w-full text-left",
                    dark && "bg-dark text-white dark:bg-black/30",
                    className,
                ])}
                {...props}
            >
                {props.children}
            </table>
        </tableContext.Provider>
    );
}

interface TheadProps
    extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<"thead"> {
    variant?: "default" | "light" | "dark";
}

const theadContext = createContext<{
    variant: TheadProps["variant"];
}>({
    variant: "default",
});
Table.Thead = ({ className, ...props }: TheadProps) => {
    return (
        <theadContext.Provider
            value={{
                variant: props.variant,
            }}
        >
            <thead
                className={twMerge([
                    props.variant === "light" && "bg-slate-200/60 dark:bg-slate-200",
                    props.variant === "dark" && "bg-dark text-white dark:bg-black/30",
                    className,
                ])}
                {...props}
            >
                {props.children}
            </thead>
        </theadContext.Provider>
    );
};

type TbodyProps = React.PropsWithChildren<
    React.ComponentPropsWithoutRef<"tbody">
>;

Table.Tbody = ({ className, ...props }: TbodyProps) => {
    return <tbody className={className}>{props.children}</tbody>;
};

type TrProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"tr">;

Table.Tr = function Tr({ className, ...props }: TrProps) {
    return (
        <tr
            className={className}
            {...props}
        >
            {props.children}
        </tr>
    );
};

type ThProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"th">;

Table.Th = function Th({ className, ...props }: ThProps) {
    const table = useContext(tableContext);
    const thead = useContext(theadContext);
    return (
        <th
            className={twMerge([
                "font-medium px-5 py-3 border-b-2 dark:border-darkmode-300",
                thead.variant === "light" && "border-b-0 text-slate-700",
                thead.variant === "dark" && "border-b-0",
                table.dark && "border-slate-600 dark:border-darkmode-300",
                className,
            ])}
            {...props}
        >
            {props.children}
        </th>
    );
};

type TdProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"td">;

Table.Td = function Td({ className, ...props }: TdProps) {
    const table = useContext(tableContext);
    return (
        <td
            className={twMerge([
                "px-5 py-3 border-b dark:border-darkmode-300",
                table.dark && "border-slate-600 dark:border-darkmode-300",
                className,
            ])}
            {...props}
        >
            {props.children}
        </td>
    );
};