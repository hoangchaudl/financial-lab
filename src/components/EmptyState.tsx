import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
}: EmptyStateProps) {
  return (
    <Card className="py-12 px-6 text-center flex flex-col items-center gap-4">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="h-8 w-8 text-primary" strokeWidth={2} />
      </div>
      <div className="space-y-1 max-w-md">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {(actionLabel || secondaryLabel) && (
        <div className="flex gap-2 mt-2">
          {actionLabel && onAction && (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
          {secondaryLabel && onSecondary && (
            <Button variant="outline" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
