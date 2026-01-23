import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useBlogs, useBlog } from "./hooks/useBlogs";
import { BlogList } from "./components/BlogList";
import { BlogDetail } from "./components/BlogDetail";
import { Loader2 } from "lucide-react";
import { cn } from "./lib/utils";


function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: blogs, isLoading: blogsLoading, error } = useBlogs();
  const { data: selectedBlog, isLoading: blogLoading } = useBlog(selectedId);

  if (blogsLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
    <div className="min-h-screen bg-background p-4 md:p-8">
      {!selectedId ? (
        <header className="mb-8 max-w-[1150px] mx-auto">
          <h1
            className={cn(
              "text-3xl font-bold tracking-tight transition-all",
              selectedId ? "text-primary" : "text-foreground"
            )}
          >
            My Tech Blog
          </h1>
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
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
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
    </div >
  );
}

export default App;
