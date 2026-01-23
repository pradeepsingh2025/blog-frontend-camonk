import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2 } from "lucide-react";
import { useCreateBlog } from "../hooks/useBlogs";
import { Button } from "./ui/button";

// I will assume standard shadcn/custom components or basic HTML if they don't exist.
// Checking file list earlier showed button, card, badge. No input/textarea.
// I will use standard HTML elements styled with Tailwind for now to avoid assuming components that might not exist, or I can check for them.
// Wait, I didn't check for Input/Textarea. I'll stick to standard HTML with tailwind classes for simplicity and robustness.

interface CreateBlogModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateBlogModal({ isOpen, onClose }: CreateBlogModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [coverImage, setCoverImage] = useState("");

    const createBlogMutation = useCreateBlog();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        if (!title || !description || !content || !category) return;

        createBlogMutation.mutate({
            title,
            description,
            content,
            category: category.split(",").map(c => c.trim()),
            coverImage: coverImage || "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" // Default image
        }, {
            onSuccess: () => {
                onClose();
                // Reset form
                setTitle("");
                setDescription("");
                setContent("");
                setCategory("");
                setCoverImage("");
            }
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-background w-full max-w-lg rounded-xl border shadow-lg pointer-events-auto flex flex-col max-h-[90vh]"
                        >
                            <div className="flex items-center justify-between border-b p-6">
                                <h2 className="text-xl font-semibold">Create New Post</h2>
                                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                <form id="create-blog-form" onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                                        <input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Awesome Blog Title"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="category" className="text-sm font-medium">Category (comma separated)</label>
                                        <input
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            placeholder="Tech, React, Design"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="coverImage" className="text-sm font-medium">Cover Image URL</label>
                                        <input
                                            id="coverImage"
                                            value={coverImage}
                                            onChange={(e) => setCoverImage(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="description" className="text-sm font-medium">Short Description</label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            placeholder="A brief summary..."
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="content" className="text-sm font-medium">Content</label>
                                        <textarea
                                            id="content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            placeholder="Write your blog post here..."
                                            required
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="flex justify-end gap-4 border-t p-6">
                                <Button variant="outline" onClick={onClose} type="button">
                                    Cancel
                                </Button>
                                <Button type="submit" form="create-blog-form" disabled={createBlogMutation.isPending}>
                                    {createBlogMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Post
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
