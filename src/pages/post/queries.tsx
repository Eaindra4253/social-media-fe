import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as commentService from "@/services/comment.service";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getMyPosts,
} from "@/services/post.service";
import { showNotification } from "@mantine/notifications";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createPost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
    },
  });
}

export function useMyPosts(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["my-posts", page, limit],
    queryFn: () => getMyPosts(page, limit).then((res) => res.data),
  });
}

export function useEditPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { postId: string; data: FormData }) =>
      editPost(params.postId, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
    },
  });
}


export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),

    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["all-posts"] });
      const allPages = queryClient.getQueriesData<{ posts: any[] }>({ queryKey: ["all-posts"] });

      allPages.forEach(([key, oldData]) => {
        if (!oldData) return;
        queryClient.setQueryData(key, {
          ...oldData,
          posts: oldData.posts.filter((p) => p._id !== postId),
        });
      });

      return { allPages }; 
    },

    onError: (_err, _postId, context) => {
      context?.allPages?.forEach(([key, oldData]) => {
        queryClient.setQueryData(key, oldData);
      });
      showNotification({
        title: "Error",
        message: "Failed to delete post",
        color: "red",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-posts"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["my-posts"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["profile"], exact: false }); 
      
      showNotification({
        title: "Success",
        message: "Post deleted successfully",
        color: "green",
      });
    },
  });
}

export function useAllPosts(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["all-posts", page, limit],
    queryFn: () => getAllPosts(page, limit).then((res) => res.data),
  });
}

export function useAddComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => commentService.addComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
}

export function useComments(postId: string, enabled = true) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => commentService.getComments(postId).then((res) => res.data),
    enabled,
  });
}

export function useToggleReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, type }: { postId: string; type?: string }) =>
      commentService.toggleReaction(postId, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });
}
