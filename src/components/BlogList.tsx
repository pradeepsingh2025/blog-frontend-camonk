import { motion } from "framer-motion";
import type { Blog } from "../api/blogApi";
import { BlogCard } from "./BlogCard";
import { cn } from "../lib/utils";

interface BlogListProps {
    blogs: Blog[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    className?: string;
}

export function BlogList({
    blogs,
    selectedId,
    onSelect,
    className,
}: BlogListProps) {
    const isSidebar = !!selectedId;

    return (
        <motion.div
            layout
            className={cn(
                "grid gap-6",
                isSidebar
                    ? "grid-cols-1 overflow-x-auto overflow-y-hidden md:flex md:w-[350px] md:flex-col md:overflow-y-auto md:overflow-x-hidden"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                className
            )}
        >
            {blogs.map((blog) => (
                <motion.div
                    layout
                    key={blog.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(isSidebar ? "min-w-[300px]" : "w-full")}
                >
                    <BlogCard
                        blog={blog}
                        onClick={onSelect}
                        active={selectedId === blog.id}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}
