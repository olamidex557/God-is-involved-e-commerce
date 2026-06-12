import type { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
}

const Heading = ({ children }: HeadingProps) => {
  return (
    <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
      {children}
    </h1>
  );
};

export default Heading;