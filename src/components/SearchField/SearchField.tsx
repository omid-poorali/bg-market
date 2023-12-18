import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import clsx from 'clsx';

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


	return (
		<div data-testid="root" style={style} className={clsx("flex items-center p-3 gap-2 border rounded-xl border-primary dark:border-white mx-auto",
			{ "w-full": fullWidth }, className)}>
			<span>{startAdornment ?? <SearchIcon />}</span>
			<input
				className="w-full bg-transparent border-none focus:outline-none dark:placeholder:text-[#ffffff4d]"
				ref={forwardedRef}
				placeholder={placeholder}
				{...rest}
				type='text' />
		</div>
	);
});

SearchField.displayName = "SearchField";
