import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "pending"
  | "danger"
  | "dark";

type Elevated = boolean;
type Rounded = boolean;

type ButtonProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    as?: C extends string ? "button" | "a" : C;
    variant?: Variant;
    elevated?: Elevated;
    rounded?: Rounded;
  }
>;

type ButtonComponent = <C extends React.ElementType = "button">(
  props: ButtonProps<C>
) => React.ReactElement | null;

function ButtonComponent<C extends React.ElementType>({
  as,
  size,
  variant,
  elevated,
  rounded,
  children,
  ...props
}: ButtonProps<C>, ref?: PolymorphicRef<C>) {
  const Component = as || "button";

  // General Styles
  const generalStyles = [
    "transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer", // Default
    "focus:ring-4 focus:ring-primary focus:ring-opacity-20", // On focus
    "focus-visible:outline-none", // On focus visible
    "dark:focus:ring-slate-700 dark:focus:ring-opacity-50", // Dark mode
    "[&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90", // On hover and not disabled
    "[&:not(button)]:text-center", // Not a button element
    "disabled:opacity-70 disabled:cursor-not-allowed", // Disabled
  ];

  // Sizes
  const small = ["text-xs py-1.5 px-2"];
  const large = ["text-lg py-1.5 px-4"];

  // Main Colors
  const primary = [
    "bg-primary border-primary text-white dark:border-primary", // Default
  ];
  const secondary = [
    "bg-secondary/70 border-secondary/70 text-slate-500", // Default
    "dark:border-darkmode-400 dark:bg-darkmode-400 dark:text-slate-300", // Dark mode
    "[&:hover:not(:disabled)]:bg-slate-100 [&:hover:not(:disabled)]:border-slate-100", // On hover and not disabled
    "[&:hover:not(:disabled)]:dark:border-darkmode-300/80 [&:hover:not(:disabled)]:dark:bg-darkmode-300/80", // On hover and not disabled in dark mode
  ];
  const success = [
    "bg-success border-success text-slate-900", // Default
    "dark:border-success", // Dark mode
  ];
  const warning = [
    "bg-warning border-warning text-slate-900", // Default
    "dark:border-warning", // Dark mode
  ];
  const pending = [
    "bg-pending border-pending text-white", // Default
    "dark:border-pending", // Dark mode
  ];
  const danger = [
    "bg-danger border-danger text-white", // Default
    "dark:border-danger", // Dark mode
  ];
  const dark = [
    "bg-dark border-dark text-white", // Default
    "dark:bg-darkmode-800 dark:border-transparent dark:text-slate-300", // Dark mode
    "[&:hover:not(:disabled)]:dark:dark:bg-darkmode-800/70", // On hover and not disabled in dark mode
  ];

  return (
    <Component
      {...props}
      ref={ref}
      className={twMerge([
        generalStyles,
        size == "sm" && small,
        size == "lg" && large,
        variant == "primary" && primary,
        variant == "secondary" && secondary,
        variant == "success" && success,
        variant == "warning" && warning,
        variant == "pending" && pending,
        variant == "danger" && danger,
        variant == "dark" && dark,
        rounded && "rounded-full",
        elevated && "shadow-md",
        props.className,
      ])}
    >
      {children}
    </Component>
  );
}

export const Button = forwardRef(ButtonComponent);
