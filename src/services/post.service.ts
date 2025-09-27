import api from "@/configs/api";

export function createPost(formData: FormData) {
  return api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function getMyPosts(page = 1, limit = 10) {
  return api.get(`/my-posts?page=${page}&limit=${limit}`);
}

export function editPost(postId: string, formData: FormData) {
  return api.put(`/posts/${postId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function getAllPosts(page = 1, limit = 10) {
  return api.get(`/posts?page=${page}&limit=${limit}`);
}

export function deletePost(postId: string) {
  return api.delete(`/posts/${postId}`);
}
