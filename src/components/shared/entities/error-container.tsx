
import { AlertTriangleIcon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ErrorContainerProps {
  message?: string;
  title?: string;
  variant?: "default" | "destructive" | "warning" | "minimal";
  className?: string;
  icon?: React.ReactNode;
}

const ErrorContainer = ({
  message = "Something went wrong. Please try again later.",
  title = "Error",
  variant = "default",
  className,
  icon,
}: ErrorContainerProps) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case "warning":
        return <AlertTriangleIcon className="size-5 text-amber-500" />;
      case "destructive":
        return <XCircleIcon className="size-5 text-destructive" />;
      case "minimal":
        return null;
      default:
        return <AlertTriangleIcon className="size-5 text-destructive" />;
    }
  };

  const getContainerStyles = () => {
    const baseStyles = "flex justify-center items-center w-full flex-1 flex-col gap-y-4";
    
    switch (variant) {
      case "destructive":
        return cn(baseStyles, "text-destructive", className);
      case "warning":
        return cn(baseStyles, "text-amber-600", className);
      case "minimal":
        return cn(baseStyles, className);
      default:
        return cn(baseStyles, className);
    }
  };

  const getIconBgStyles = () => {
    switch (variant) {
      case "warning":
        return "bg-amber-500/10";
      case "destructive":
        return "bg-destructive/10";
      default:
        return "bg-destructive/10";
    }
  };

  return (
    <div className={getContainerStyles()}>
      <div className="flex flex-col items-center gap-y-3 text-center max-w-md">
        {(icon || getDefaultIcon()) && (
          <div className={cn("flex items-center justify-center w-12 h-12 rounded-full", getIconBgStyles())}>
            {icon || getDefaultIcon()}
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorContainer;