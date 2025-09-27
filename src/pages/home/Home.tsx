import { Center, Container, Stack, Text, Button } from "@mantine/core";
import { UserPost } from "@/components/UserPost";
import { useAllPosts } from "@/pages/post/queries";
import dayjs from "dayjs";
import { useAuthStore } from "@/stores/auth.store";
import { PostCreator } from "../post/PostCreator";
import { Header } from "@/components/Header";
import { useProfile } from "../profile/queries";
import { Loading } from "@/components/Loading";
import { useState, useEffect } from "react";
import { mergePosts } from "@/utils/posts";
import { configureDayjs } from "@/utils/date";

configureDayjs();

export const Home = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [allPosts, setAllPosts] = useState<any[]>([]);

  const { data, isLoading, isError, isFetching } = useAllPosts(page, limit);
  const currentUserId = useAuthStore((state) => state.auth?.id);
  const currentUserName = useAuthStore((state) => state.auth?.name);

  const { data: profileData } = useProfile();

  useEffect(() => {
    if (!data?.posts && !isFetching && page > 1) {
      setPage(1);
      return;
    }

    if (!data?.posts) return;

    if (page === 1) {
      setAllPosts(data.posts);
    } else {
      setAllPosts((prev) => mergePosts(prev, data.posts));
    }
  }, [data?.posts, isFetching, page]);

  const handleLoadMore = () => {
    if (page < data.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Header
        userName={currentUserName}
        avatarUrl={profileData?.profile_picture_url}
      />
      <Container
        size="sm"
        px="sm" 
        py="md"
      >
        <Stack gap="md">
          <PostCreator avatarUrl={profileData?.profile_picture_url} />

          {isLoading && <Loading />}
          <Center>
            <Stack align="center" gap="sm">
              {isError && <Text c="red">Failed to load posts</Text>}
            </Stack>
          </Center>

          {allPosts.map((post: any) => (
            <UserPost
              key={post._id}
              postId={post._id}
              user={{
                name: post.user?.name ?? "-",
                avatar:
                  post.user?.profile_picture_url ??
                  "https://via.placeholder.com/150",
                handle: post.user?.name ?? "-",
                time: dayjs(post.updated_at).fromNow(),
              }}
              content={post.content}
              image={post.image}
              video={post.video}
              likes={post.reactionCount}
              commentCount={post.commentCount}
              allowUpdate={post.user?._id === currentUserId}
              hideCommentInput={false}
            />
          ))}

          {data && page < data.totalPages && (
            <Center>
              <Button onClick={handleLoadMore} loading={isFetching}>
                Load More
              </Button>
            </Center>
          )}
        </Stack>
      </Container>
    </>
  );
};
