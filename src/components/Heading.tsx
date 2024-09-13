import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  align?: "left" | "center" | "right";
  className?: string;
}

const Heading = ({ title, align = "left", className }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "text-2xl sm:text-4xl font-bold",
        align === "left" && "",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
    >
      {title}
    </h1>
  );
};

export default Heading;
