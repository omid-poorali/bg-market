import * as lucideIcons from "lucide-react";
import clsx from "clsx";

export const { createLucideIcon, ...icons } = lucideIcons;

export type Icon = keyof typeof icons;

interface LucideProps extends React.ComponentPropsWithoutRef<"svg"> {
    icon: Icon;
}

export function Icon(props: LucideProps) {
    const { icon, className, ...computedProps } = props;
    const Component = lucideIcons[icon] as lucideIcons.LucideIcon;
    return (
        <Component
            {...computedProps}
            className={clsx(["stroke-1.5", className])}
        />
    );
}