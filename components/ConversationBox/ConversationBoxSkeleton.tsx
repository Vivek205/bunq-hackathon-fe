import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ConversationBoxSkeleton = () => (
  <Card className={"bg-white mr-4"}>
    <CardContent>
      <Skeleton className="h-4 w-full rounded-sm bg-sky-100" />
      <Skeleton className="h-4 w-full mt-2 rounded-sm bg-sky-100" />
    </CardContent>
  </Card>
);
