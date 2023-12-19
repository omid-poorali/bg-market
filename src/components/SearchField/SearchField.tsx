import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { twMerge } from "tailwind-merge";


type CustomProps = {
	fullWidth?: boolean;
	startAdornment?: React.ReactNode;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'input'>, keyof CustomProps>

export const SearchField = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {
	const {
		fullWidth = false,
		className,
		style,
		startAdornment,
		placeholder = "Search",
		...rest
	} = props;

	const classes = {
		root: twMerge("flex items-center p-3 gap-2 border rounded-xl border-primary dark:border-white mx-auto",
			fullWidth && "w-full", className),
		input: "w-full bg-transparent border-none focus:outline-none dark:placeholder:text-[#ffffff4d]"
	};

	return (
		<div style={style} className={classes.root}>
			<span>{startAdornment ?? <SearchIcon />}</span>
			<input
				className={classes.input}
				ref={forwardedRef}
				placeholder={placeholder}
				{...rest}
				type='text' />
		</div>
	);
});

SearchField.displayName = "SearchField";
