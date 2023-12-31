import React, { useMemo } from 'react';
import { useControlled } from 'hooks';
import { twMerge } from "tailwind-merge";


type CustomProps = {
    className?: string;
    disabled?: boolean;
    options?: Array<Option>;
    value?: Option["value"];
    defaultValue?: Option["value"];
    onChange?: (_event: { event: React.MouseEvent<HTMLButtonElement>, option: Option, value: Option["value"] }) => void;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'ul'>, keyof CustomProps>

export const TabMenu = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLUListElement>) => {
    const {
        onChange,
        options = [],
        value: propValue,
        defaultValue,
        className,
        disabled = false,
        ...rest
    } = props;

    const [value, setValue] = useControlled<Option["value"]>({
        controlled: propValue,
        default: defaultValue
    });

    const selectedOptionIndex = useMemo((): number => {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                return i;
            }
        }

        return -1;
    }, [options, value]);

    const handleTabItemClick = (event: React.MouseEvent<HTMLButtonElement>, option: Option) => {
        if (!disabled) {
            setValue(option.value);
            onChange?.({ event, option, value: option.value });
        }
    };

    const classes = {
        root: twMerge('flex flex-nowrap gap-2 overflow-x-scroll no-scrollbar', className),
        button: "border border-black dark:border-white rounded-full py-2 px-5 text-sm",
        activeButton: "bg-primary text-white dark:bg-white dark:text-[#020913]"
    }

    return (
        <ul
            ref={forwardedRef}
            className={classes.root}
            {...rest}>
            {React.Children.toArray(options.map((option, index) => {
                const active = selectedOptionIndex === index;
                return (
                    <li>
                        <button
                            className={twMerge(classes.button, active && classes.activeButton)}
                            type="button"
                            onClick={event => handleTabItemClick(event, option)}>
                            {option.label}
                        </button>
                    </li>
                )
            }))}
        </ul>
    );
});

TabMenu.displayName = "TabMenu";
