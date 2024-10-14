import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const SideView = ({ name }: { name?: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>ES</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-bold">Welcome</div>
        <div className="opacity-65">@{name}</div>
      </div>
    </div>
  );
};
