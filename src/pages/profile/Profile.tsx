import {
  Avatar,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  rem,
  Loader,
  Center,
  Button,
} from "@mantine/core";
import { UserPost } from "@/components/UserPost";
import { Header } from "@/components/Header";
import { useProfile } from "@/pages/profile/queries";
import { useEffect, useState } from "react";
import { useMyPosts } from "@/pages/post/queries";
import dayjs from "dayjs";
import { mergePosts } from "@/utils/posts";

export default function Profile() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [allPosts, setAllPosts] = useState<any[]>([]);

  const { data: profileData, isLoading: isProfileLoading } = useProfile();

  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
    isFetching,
  } = useMyPosts(page, limit);

  useEffect(() => {
    if (!postsData?.posts && page > 1) {
      setPage(1);
      return;
    }

    if (!postsData?.posts) return;

    if (page === 1) {
      setAllPosts(postsData.posts);
    } else {
      setAllPosts((prev) => mergePosts(prev, postsData.posts));
    }
  }, [postsData?.posts, page]);

  if (isProfileLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  }

  const user = {
    name: profileData?.name ?? "-",
    email: profileData?.email ?? "-",
    avatar:
      profileData?.profile_picture_url ?? "https://via.placeholder.com/150",
    postsCount: profileData?.post_count ?? 0,
    likesCount: profileData?.reaction_count ?? 0,
    commentsCount: profileData?.comment_count ?? 0,
  };

  const handleLoadMore = () => {
    if (postsData && page < postsData.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Header avatarUrl={profileData?.profile_picture_url} />
      <Container size="sm" py="md">
        <Stack gap="md">
          <Paper
            shadow="sm"
            radius="md"
            p="md"
            style={{
              width: "95%",
              maxWidth: 500,
              margin: "20px auto",
            }}
          >
            <Title order={4} mb="md">
              Profile
            </Title>
            <Group align="center" gap="md" mb="md">
              <Avatar src={user.avatar} size={rem(80)} radius="xl" />
              <Stack gap={rem(4)}>
                <Text fw={700} size="xl">
                  {user.name}
                </Text>
                <Text c="dimmed">{user.email}</Text>
              </Stack>
            </Group>

            <Group justify="space-around">
              <Stack align="center" gap={rem(2)}>
                <Text fw={700}>{user.postsCount}</Text>
                <Text c="dimmed">Posts</Text>
              </Stack>
              <Stack align="center" gap={rem(2)}>
                <Text fw={700}>{user.likesCount}</Text>
                <Text c="dimmed">Likes</Text>
              </Stack>
              <Stack align="center" gap={rem(2)}>
                <Text fw={700}>{user.commentsCount}</Text>
                <Text c="dimmed">Comments</Text>
              </Stack>
            </Group>
          </Paper>

          <Title
            order={4}
            m="auto"
            style={{ width: "80%", maxWidth: rem(960) }}
          >
            Your Posts
          </Title>

          {isPostsLoading && page === 1 && (
            <Center>
              <Loader />
            </Center>
          )}
          {isPostsError && <Text c="red">Failed to load posts.</Text>}

          {allPosts.map((post) => (
            <UserPost
              key={post._id}
              postId={post._id}
              user={{
                name: post.user.name,
                avatar:
                  post.user.profile_picture_url ??
                  "https://via.placeholder.com/150",
                handle: post.user.name,
                time: dayjs(post.created_at).fromNow(),
              }}
              content={post.content}
              image={post.image}
              video={post.video}
              likes={post.reactionCount ?? 0}
              commentCount={post.commentCount ?? 0}
              allowUpdate
              hideCommentInput
            />
          ))}

          {postsData && page < postsData.totalPages && (
            <Center>
              <Button
                variant="light"
                onClick={handleLoadMore}
                loading={isFetching}
              >
                Load More
              </Button>
            </Center>
          )}
        </Stack>
      </Container>
    </>
  );
}
