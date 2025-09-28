import {
  Paper,
  Group,
  Avatar,
  Text,
  Image,
  ActionIcon,
  FileInput,
  Button,
  rem,
  Box,
  Stack,
} from "@mantine/core";
import {
  IconEdit,
  IconHeart,
  IconMessageCircle,
  IconHeartFilled,
  IconTrash,
} from "@tabler/icons-react";
import { CommentSection } from "./CommentSection";
import { useState } from "react";
import {
  useDeletePost,
  useEditPost,
  useToggleReaction,
} from "@/pages/post/queries";
import { modals } from "@mantine/modals";

interface UserPostProps {
  postId: string;
  user: { name: string; avatar: string; handle: string; time: string };
  content: string;
  image?: string;
  video?: string;
  likes: number;
  commentCount: number;
  allowUpdate?: boolean;
  hideCommentInput?: boolean;
}

export function UserPost({
  postId,
  user,
  content,
  image,
  video,
  likes,
  allowUpdate,
  commentCount,
  hideCommentInput,
}: UserPostProps) {
  const [showComments, setShowComments] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [liked, setLiked] = useState(false);

  const editPost = useEditPost();
  const deletePostMutation = useDeletePost();
  const toggleReaction = useToggleReaction();

  const handleSave = () => {
    const formData = new FormData();
    formData.append("content", newContent);
    formData.append("title", newContent);
    if (imageFile) formData.append("image", imageFile);
    if (videoFile) formData.append("video", videoFile);

    editPost.mutate(
      { postId, data: formData },
      {
        onSuccess: () => {
          setEditMode(false);
          setImageFile(null);
          setVideoFile(null);
        },
      }
    );
  };

  const handleDelete = (postId: string) => {
    modals.openConfirmModal({
      title: "Are you sure you want to delete this post?",
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => deletePostMutation.mutate(postId),
    });
  };

  const handleToggleLike = () => {
    toggleReaction.mutate(
      { postId, type: "like" },
      {
        onSuccess: (res: any) => {
          setLiked(res?.data?.status === "liked");
        },
      }
    );
  };

  return (
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
      <Group mb="xs" justify="space-between" align="flex-start" wrap="nowrap">
        <Group align="flex-start" gap="sm" wrap="nowrap">
          <Avatar src={user.avatar} radius="xl" size="md" />
          <Box style={{ minWidth: 0 }}>
            <Text fw={500} lineClamp={1}>
              {user.name}
            </Text>
            <Text size="sm" c="dimmed" lineClamp={1}>
              @{user.handle} · {user.time}
            </Text>
          </Box>
        </Group>

        {allowUpdate && (
          <Group gap={4}>
            <ActionIcon
              variant="subtle"
              aria-label="Edit post"
              onClick={() => setEditMode(!editMode)}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              aria-label="Delete post"
              onClick={() => handleDelete(postId)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        )}
      </Group>

      {editMode ? (
        <Stack gap="sm">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{
              width: "100%",
              minHeight: 80,
              borderRadius: 8,
              padding: 8,
              resize: "vertical",
            }}
          />

          <FileInput
            placeholder="Select image"
            accept="image/*"
            value={imageFile}
            onChange={setImageFile}
            mb="sm"
            disabled={!!videoFile}
            clearable
          />

          <FileInput
            placeholder="Select video"
            accept="video/*"
            value={videoFile}
            onChange={setVideoFile}
            mb="sm"
            disabled={!!imageFile}
            clearable
          />

          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      ) : (
        <Stack gap="sm">
          <Text style={{ whiteSpace: "pre-wrap" }}>{newContent}</Text>

          {image && (
            <Image
              src={image}
              alt="post image"
              w="100%"
              h="100%"
              mah={500} 
              maw={800}
              fit="fill"
            />
          )}

          {video && (
            <video
              controls
              style={{
                width: "100%",
                maxWidth: "100%",
                borderRadius: 8,
                maxHeight: 400,
              }}
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </Stack>
      )}

      <Group mt="md" gap="md" align="center">
        <Group gap={4} align="center">
          <ActionIcon
            variant="subtle"
            onClick={handleToggleLike}
            color={liked ? "red" : "gray"}
            aria-label="Like post"
          >
            {liked ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
          </ActionIcon>
          <Text size="sm" c="dimmed">
            {likes}
          </Text>
        </Group>

        <Group gap={4} align="center">
          <ActionIcon
            variant="subtle"
            onClick={() => setShowComments(!showComments)}
            aria-label="Toggle comments"
          >
            <IconMessageCircle size={18} />
          </ActionIcon>
          <Text size="sm" c="dimmed">
            {commentCount}
          </Text>
        </Group>
      </Group>

      <CommentSection
        show={showComments}
        hideInput={hideCommentInput ?? true}
        postId={postId}
      />
    </Paper>
  );
}
