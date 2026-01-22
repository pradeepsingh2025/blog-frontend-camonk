import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="mb-8">
        <h1
          className={cn(
            "text-3xl font-bold tracking-tight transition-all",
            selectedId ? "text-primary" : "text-foreground"
          )}
        >
          My Tech Blog
        </h1>
      </header>

      <motion.div layout className="flex h-[calc(100vh-140px)] gap-6">
        {/* Left Side (List/Grid) */}
        <BlogList
          blogs={blogs || []}
          selectedId={selectedId}
          onSelect={setSelectedId}
          className={cn(
            selectedId ? "flex-none" : "w-full",
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
              transition={{ duration: 0.3 }}
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
