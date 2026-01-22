import axios from "axios";

// Base URL for the JSON server
const API_URL = "http://localhost:3001";

export interface Blog {
    id: string;
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export const fetchBlogs = async (): Promise<Blog[]> => {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
};

export const fetchBlogById = async (id: string): Promise<Blog> => {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
};
