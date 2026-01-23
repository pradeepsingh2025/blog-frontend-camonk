import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface BlogDetailSkeletonProps {
    onClose: () => void;
}

export function BlogDetailSkeleton({ onClose }: BlogDetailSkeletonProps) {
    return (
        <div className="relative h-full overflow-y-auto rounded-lg bg-background py-6 px-0 shadow-sm">
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-7 top-5 z-10"
                onClick={onClose}
            >
                <X className="h-4 w-4" />
            </Button>

            <div className="mx-auto w-full px-6">
                <div className="mb-6 space-y-4">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-16" />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-3/4" />
                    </div>

                    {/* Date */}
                    <Skeleton className="h-4 w-32" />
                </div>

                {/* Banner Image */}
                <Skeleton className="mb-8 h-[300px] w-full rounded-lg" />

                {/* Content */}
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <br />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
    );
}
