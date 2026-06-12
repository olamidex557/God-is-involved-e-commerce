import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        px-8
        py-4
        bg-[#D4AF37]
        text-black
        font-semibold
        rounded-full
        transition
        hover:scale-105
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;