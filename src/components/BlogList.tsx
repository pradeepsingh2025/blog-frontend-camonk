import { motion } from "motion/react";
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
                "grid gap-2 md:gap-4",
                isSidebar
                    ? "grid-cols-1 overflow-x-auto overflow-y-hidden md:flex md:w-[350px] md:flex-col md:overflow-y-auto md:overflow-x-hidden"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                className
            )}
        >
            {blogs.map((blog, index) => (
                <motion.div
                    layout
                    key={blog.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 30
                    }}

                    className={cn(isSidebar ? "max-w-[300px] flex flex-col gap-2" : "w-full")}
                >
                    {index === 1 && selectedId && (<p className="text-left text-sm font-semibold pb-1 pl-3">Similar Reads</p>)}
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
