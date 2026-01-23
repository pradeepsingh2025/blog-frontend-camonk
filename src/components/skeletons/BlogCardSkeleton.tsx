import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";

export function BlogCardSkeleton() {
    return (
        <div className="p-2 h-full">
            <Card className="flex flex-col h-full bg-slate-50/50">
                <CardHeader className="p-4 space-y-3">
                    {/* Categories */}
                    <div className="flex gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    {/* Title */}
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-2/3" />
                    </div>
                    {/* Date */}
                    <Skeleton className="h-3 w-24" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    {/* Description */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
