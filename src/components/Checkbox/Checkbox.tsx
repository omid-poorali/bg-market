import React, { useId } from 'react';
import { useControlled } from 'hooks';

type CustomProps = {
    style?: React.CSSProperties;
    className?: string;
    label?: string;
    disabled?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'input'>, keyof CustomProps>;

export const Checkbox = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLInputElement>) => {
    const {
        id: defaultId,
        style,
        label,
        disabled = false,
        onChange,
        checked: propChecked,
        defaultChecked,
        ...rest
    } = props;

    const inputId = useId();
    const id = defaultId ?? inputId;

    const [checked, setChecked] = useControlled<boolean>({
        controlled: propChecked,
        default: defaultChecked,
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            const { checked } = event.target;
            onChange?.(event);
            setChecked(checked);
        }
    };

    const classes = {
        root: "flex items-center gap-2 md:mt-0 mt-10",
        box: "w-6 h-6 rounded-full border-primary dark:border-white border relative cursor-pointer",
        label: "m-0 font-normal text-base dark:text-[#ffffff33]"
    }

    return (
        <div
            className={classes.root}
            style={style}>
            <div
                role='checkbox'
                aria-checked={checked}
                className={classes.box}>
                <input
                    id={id}
                    className="hidden"
                    ref={forwardedRef}
                    checked={checked}
                    onChange={handleOnChange}
                    {...rest}
                    type='checkbox'
                />
                {checked && (
                    <div className="">

                    </div>
                )}
            </div>
            {label && <label htmlFor={id} className={classes.label}>{label}</label>}
        </div>
    );
});

Checkbox.displayName = "Checkbox";
