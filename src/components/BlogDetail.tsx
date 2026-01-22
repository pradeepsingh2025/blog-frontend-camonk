import { format } from "date-fns";
import { motion } from "framer-motion";
import type { Blog } from "../api/blogApi";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

interface BlogDetailProps {
    blog: Blog;
    onClose: () => void;
}

export function BlogDetail({ blog, onClose }: BlogDetailProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="relative h-full overflow-y-auto rounded-lg border bg-background p-6 shadow-sm"
        >
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={onClose}
            >
                <X className="h-4 w-4" />
            </Button>

            <div className="mx-auto max-w-3xl">
                <div className="mb-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {blog.category.map((cat) => (
                            <Badge key={cat}>{cat}</Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {blog.title}
                    </h1>
                    <p className="text-muted-foreground">
                        Published on {format(new Date(blog.date), "MMMM d, yyyy")}
                    </p>
                </div>

                <div className="mb-8 aspect-video w-full overflow-hidden rounded-xl">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="prose prose-stone max-w-none dark:prose-invert">
                    <p className="lead whitespace-pre-line text-lg leading-relaxed">
                        {blog.description}
                    </p>
                    <div className="mt-8 whitespace-pre-line text-base leading-7">
                        {blog.content}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
