import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return (
    <section className="py-24 lg:py-32">
      {children}
    </section>
  );
};

export default Section;