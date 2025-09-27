import api from "@/configs/api";

export function addComment(postId: string, content: string) {
  return api.post(`/posts/${postId}/comments`, { content });
}

export function getComments(postId: string) {
  return api.get(`/posts/${postId}/comments`);
}

export function toggleReaction(postId: string, type: string = "like") {
  return api.post(`/posts/${postId}/reaction`, { type });
}
