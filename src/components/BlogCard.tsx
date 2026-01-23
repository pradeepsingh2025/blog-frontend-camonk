import { format } from "date-fns";
import type { Blog } from "../api/blogApi";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

interface BlogCardProps {
    blog: Blog;
    onClick: (id: string) => void;
    active?: boolean;
}

export function BlogCard({ blog, onClick, active }: BlogCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.009 }}
            transition={{
                type: "spring",
                stiffness: 180,
                damping: 30
            }}
            className="p-2 h-full "

        >
            <Card
                className={cn(
                    "flex flex-col justify-evenly items-start h-full cursor-pointer overflow-hidden transition-color hover:bg-slate-50",
                    active && "border-primary bg-muted"
                )}
                onClick={() => onClick(blog.id)}
            >

                <CardHeader className="p-4">
                    <div className="mb-2 flex flex-wrap gap-2">
                        {blog.category.map((cat) => (
                            <Badge key={cat} variant="secondary" className="text-[10px]">
                                {cat}
                            </Badge>
                        ))}
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight">
                        {blog.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {format(new Date(blog.date), "MMMM d, yyyy")}
                    </p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                        {blog.description}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}
