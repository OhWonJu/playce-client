import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  align?: "left" | "center" | "right";
}

const Heading = ({ title, align = "left" }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "text-4xl sm:text-6xl font-bold",
        align === "left" && "",
        align === "center" && "text-center",
        align === "right" && "text-right",
      )}
    >
      {title}
    </h1>
  );
};

export default Heading;
