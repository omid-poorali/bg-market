/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;
  type Option = {
    label: string;
    value: any;
    extra?: any;
  };
}

export { };
