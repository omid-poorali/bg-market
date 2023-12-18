import React from 'react';
import { Checkbox, SearchField, TabMenu } from "components";
import { twMerge } from "tailwind-merge";

const tabs: Option[] = [
    { label: "All", value: 0 },
    { label: "Infrastructure", value: 1 },
    { label: "Payments", value: 2 },
    { label: "DeFi", value: 3 },
    { label: "Memes", value: 4 },
    { label: "Web3", value: 5 },
    { label: "Gaming", value: 6 },
]

type CustomProps = {
    query: string;
    updateSearchParam: (update: { [key: string]: string }) => void;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof CustomProps>

export const Filter = (props: PropsType) => {
    const {
        className,
        updateSearchParam,
        query,
        ...rest
    } = props;


    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateSearchParam({ query: event.target.value, page: "1" });
    };

    const classes = {
        root: twMerge('', className),
    }

    return (
        <div className={classes.root} {...rest}>
            <SearchField fullWidth className="mb-8" defaultValue={query} onChange={handleQueryChange} />
            <div className="flex flex-col md:justify-between md:items-center md:flex-row">
                <TabMenu value={0} options={tabs} />
                <Checkbox label="Available for Trading" />
            </div>
        </div>
    );
};