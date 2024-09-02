import { cn } from "@/lib/utils";

const IntersectionLabel = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <div className={cn("relative flex flex-col justify-center items-center w-full", className)}>
      <div className="absolute w-full border-t-[1.3px] border-primary-foreground" />
      <div className="relative">
        <span className="px-2 text-sm bg-background text-primary-foreground">
          {label}
        </span>
      </div>
    </div>
  );
};

export default IntersectionLabel;
