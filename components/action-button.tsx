"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { match } from "ts-pattern";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const ActionButton = ({
  className,
  text,
  onClick,
}: {
  className?: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      key={crypto.randomUUID()}
      disabled={pending}
      className={cn(className)}
      onClick={onClick}
    >
      {match(pending)
        .with(true, () => <LoaderCircle className="animate-spin" />)
        .with(false, () => text)
        .exhaustive()}
    </Button>
  );
};
