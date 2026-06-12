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
        group
        relative
        overflow-hidden
        rounded-full
        bg-[#D4AF37]
        text-black
        px-8
        py-4
        font-semibold
        transition-all
        duration-500
        hover:scale-105
        hover:shadow-[0_0_40px_rgba(212,175,55,0.35)]
        ${className}
      `}
    >
      <span className="relative z-10">
        {children}
      </span>

      <div
        className="
        absolute
        inset-0
        bg-white/20
        translate-x-[-100%]
        group-hover:translate-x-[100%]
        transition-transform
        duration-700
        "
      />
    </button>
  );
};

export default Button;