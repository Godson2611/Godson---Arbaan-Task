import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = {
  async fetchSummary() {
    const [posts, comments, todos] = await Promise.all([
      axios.get(`${API_BASE_URL}/posts`),
      axios.get(`${API_BASE_URL}/comments`),
      axios.get(`${API_BASE_URL}/todos`),
    ]);

    return {
      posts: posts.data.length,
      comments: comments.data.length,
      todos: todos.data.length,
    };
  },

  async fetchPosts() {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  },

  async fetchPost(id) {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  },

  async updatePost(id, data) {
    const response = await axios.patch(`${API_BASE_URL}/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id) {
    await axios.delete(`${API_BASE_URL}/posts/${id}`);
  },
};
