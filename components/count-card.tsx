import { Loader2Icon, TrendingUpDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const CountCard = ({
  text1,
  text2,
  count,
  loading,
}: {
  text1?: string;
  text2?: string;
  count: number;
  loading?: boolean;
}) => {
  return (
    <Card className="md:w-[18rem]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {text1}{" "}
          <Button variant={"outline"} size="icon" className="rounded-full p-1">
            <TrendingUpDown className="opacity-75" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl font-bold">
        {loading ? <Loader2Icon className="animate-spin" /> : count}
      </CardContent>
      <CardFooter className="text-xm text-[#FF6600]/65">{text2}</CardFooter>
    </Card>
  );
};
