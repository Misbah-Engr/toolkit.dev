import { cn } from "@/lib/utils";
import { getClientToolkit } from "@/toolkits/toolkits/client";
import type { Toolkits } from "@/toolkits/toolkits/shared";

interface Props {
  toolkits: Toolkits[];
  orientation?: "horizontal" | "vertical";
  containerClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
}

export const ToolkitIcons = ({
  toolkits,
  orientation = "horizontal",
  containerClassName,
  iconContainerClassName,
  iconClassName,
}: Props) => {
  if (toolkits.length === 0) return null;

  return (
    <div
      className={cn(
        "flex items-center",
        {
          "flex-col pt-2": orientation === "vertical",
          "flex-row pl-2": orientation === "horizontal",
        },
        containerClassName,
      )}
    >
      {toolkits.map((toolkit) => {
        return (
          <div
            className={cn(
              "border-primary bg-muted rounded-full border p-1",
              iconContainerClassName,
              {
                "-mt-2": orientation === "vertical",
                "-ml-2": orientation === "horizontal",
              },
            )}
            key={toolkit}
          >
            <ToolkitIcon
              toolkit={toolkit}
              className={cn(iconClassName, "text-primary")}
            />
          </div>
        );
      })}
    </div>
  );
};

interface ToolkitIconProps {
  toolkit: Toolkits;
  className?: string;
}

export const ToolkitIcon = ({ toolkit, className }: ToolkitIconProps) => {
  const Icon = getClientToolkit(toolkit).icon;
  return <Icon className={cn("size-3 md:size-4", className)} />;
};
