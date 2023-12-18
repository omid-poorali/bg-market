import React from "react";
import * as lucideIcons from "lucide-react";
import { twMerge } from "tailwind-merge";


export const { createLucideIcon, ...icons } = lucideIcons;

export type Icon = keyof typeof icons;

type CustomProps = {
    icon: Icon;
}

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'svg'>, keyof CustomProps>

export const Icon = React.forwardRef((props: PropsType, forwardedRef: React.Ref<SVGSVGElement>) => {
    const {
        icon,
        className,
        ...rest } = props;

    const Component = lucideIcons[icon] as lucideIcons.LucideIcon;
    
    return (
        <Component
            ref={forwardedRef}
            className={twMerge(["stroke-1.5", className])}
            {...rest}
        />
    );
});

Icon.displayName = "Icon";