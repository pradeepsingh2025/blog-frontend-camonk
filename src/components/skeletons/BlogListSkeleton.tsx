import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { cn } from "../../lib/utils";

interface BlogListSkeletonProps {
    isSidebar?: boolean;
}

export function BlogListSkeleton({ isSidebar }: BlogListSkeletonProps) {
    return (
        <div
            className={cn(
                "grid gap-2 md:gap-4",
                isSidebar
                    ? "grid-cols-1 overflow-x-auto overflow-y-hidden md:flex md:w-[350px] md:flex-col md:overflow-hidden"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            )}
        >
            {/* Render 8 skeletons for grid, or 4 for sidebar */}
            {Array.from({ length: isSidebar ? 4 : 8 }).map((_, i) => (
                <div key={i} className={cn(isSidebar ? "max-w-[300px] w-full" : "w-full")}>
                    <BlogCardSkeleton />
                </div>
            ))}
        </div>
    );
}
