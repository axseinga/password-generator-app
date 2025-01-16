import { IconArrowRight } from "./icons/icon-arrow-right";

type ButtonProps = {
  label: string;
  type?: "submit" | "button";
  hasIcon?: boolean;
};

export const Button = ({ type, hasIcon, label }: ButtonProps) => {
  return (
    <button
      type={type}
      className="sm:text-body-s group flex h-[3.625rem] w-full items-center justify-center gap-4 border-2 border-transparent bg-customGreen uppercase text-customDarkGrey transition-all duration-300 hover:border-customGreen hover:bg-transparent hover:text-customGreen sm:h-[4rem] sm:gap-6"
    >
      <p>{label}</p>
      {hasIcon && <IconArrowRight />}
    </button>
  );
};
