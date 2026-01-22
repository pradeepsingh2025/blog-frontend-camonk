import { useQuery } from "@tanstack/react-query";
import { fetchBlogs, fetchBlogById } from "../api/blogApi";

export const useBlogs = () => {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: fetchBlogs,
    });
};

export const useBlog = (id: string | null) => {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlogById(id!),
        enabled: !!id,
    });
};
