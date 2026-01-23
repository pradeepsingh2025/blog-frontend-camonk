import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useBlogs, useBlog } from "./hooks/useBlogs";
import { BlogList } from "./components/BlogList";
import { BlogDetail } from "./components/BlogDetail";
import { CreateBlogModal } from "./components/CreateBlogModal";
import { BlogListSkeleton } from "./components/skeletons/BlogListSkeleton";
import { BlogDetailSkeleton } from "./components/skeletons/BlogDetailSkeleton";
import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";


function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { data: blogs, isLoading: blogsLoading, error } = useBlogs();
  const { data: selectedBlog, isLoading: blogLoading } = useBlog(selectedId);

  if (blogsLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <header className="mb-8 max-w-[1150px] mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight transition-all text-foreground">
            My Tech Blog
          </h1>
        </header>
        <div className="flex h-screen gap-2 justify-center">
          <div className="w-full max-w-[1200px]">
            <BlogListSkeleton isSidebar={false} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-red-500">
        Error loading blogs
      </div>
    );
  }

  const displayedBlogs = selectedId && blogs
    ? (() => {
      const current = blogs.find((b) => b.id === selectedId);
      if (!current) return blogs;
      const similar = blogs.filter(
        (b) =>
          b.id !== selectedId &&
          b.category.some((cat) => current.category.includes(cat))
      );
      return [current, ...similar.slice(0, 4)];
    })()
    : blogs || [];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {!selectedId ? (
        <header className="mb-8 max-w-[1150px] mx-auto flex items-center justify-between">
          <h1
            className={cn(
              "text-3xl font-bold tracking-tight transition-all",
              selectedId ? "text-primary" : "text-foreground"
            )}
          >
            My Tech Blog
          </h1>
          <Button
            variant="outline"
            size="default"
            onClick={() => setIsCreating(true)}
          >
            Create Post
          </Button>
        </header>
      ) : null}

      <motion.div layout className="flex h-screen gap-2">
        {/* Left Side (List/Grid) */}
        <BlogList
          blogs={displayedBlogs}
          selectedId={selectedId}
          onSelect={setSelectedId}
          className={cn(
            selectedId ? "flex-none" : "w-full max-w-[1200px]",
            // Responsive: hidden on mobile when detail is open
            selectedId && "hidden md:flex"
          )}
        />

        {/* Right Side (Detail) */}
        <AnimatePresence mode="wait">
          {selectedId && (
            <motion.div
              key="detail"
              className="flex-1 overflow-hidden"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 30
              }}

            >
              {blogLoading ? (
                <BlogDetailSkeleton onClose={() => setSelectedId(null)} />
              ) : selectedBlog ? (
                <BlogDetail
                  blog={selectedBlog}
                  onClose={() => setSelectedId(null)}
                />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div >
      <CreateBlogModal isOpen={isCreating} onClose={() => setIsCreating(false)} />
    </div >
  );
}

export default App;
