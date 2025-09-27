import {
  Group,
  Text,
  Avatar,
  Box,
  TextInput,
  ActionIcon,
  Loader,
} from "@mantine/core";
import { IconSend, IconMessageCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import dayjs from "dayjs";
import { useAddComment, useComments } from "@/pages/post/queries";
import { useProfile } from "@/pages/profile/queries";

interface CommentSectionProps {
  show: boolean;
  hideInput?: boolean;
  postId: string;
}

export function CommentSection({
  show,
  hideInput = true,
  postId,
}: CommentSectionProps) {
  const [text, setText] = useState("");
  const [loadComments, setLoadComments] = useState(false);
  const currentUser = useAuthStore((state) => state.auth);
  const { data: profileData } = useProfile();

  const { data: comments, isLoading } = useComments(postId, loadComments);
  const addComment = useAddComment(postId);

  const handleSend = () => {
    if (!text.trim()) return;
    addComment.mutate(text, {
      onSuccess: () => {
        setLoadComments(true);
      },
    });
    setText("");
  };

  const handleShowComments = () => {
    setLoadComments(true);
  };

  if (!show) return null;

  return (
    <Box mt="xs" ml={6}>
      {!hideInput && currentUser && (
        <Group align="center" mb="xs" wrap="nowrap" w="100%">
          <Avatar
            src={profileData?.profile_picture_url}
            size="md"
            radius="xl"
          />
          <TextInput
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="md"
            radius="xl"
            style={{ flexGrow: 1 }}
          />
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={handleSend}
            aria-label="Send"
          >
            <IconSend style={{ width: 20, height: 20 }} color="gray" />
          </ActionIcon>
        </Group>
      )}
      {!loadComments && (
        <Group
          gap="sm"
          align="center"
          mt="sm"
          style={(theme: import("@mantine/core").MantineTheme) => ({
            cursor: "pointer",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            backgroundColor: theme.colors.gray[0],
            transition: "background-color 0.2s",
            "&:hover": {
              backgroundColor: theme.colors.gray[1],
            },
          })}
          onClick={handleShowComments}
        >
          <IconMessageCircle size={20} color="#4B5563" />
          <Text size="sm" fw={500} c="dimmed">
            View Comments
          </Text>
        </Group>
      )}

      {loadComments &&
        (isLoading ? (
          <Loader size="sm" />
        ) : (
          comments?.map((c: any) => (
            <Group key={c._id} gap="sm" align="flex-start" mb="xs">
              <Avatar src={c.user.profile_picture_url} size="sm" />
              <div style={{ flex: 1 }}>
                <Text fw={500} size="sm">
                  @{c.user.name}{" "}
                  <Text span size="xs" c="dimmed">
                    {dayjs(c.created_at).fromNow()}
                  </Text>
                </Text>
                <Text size="sm">{c.content}</Text>
              </div>
            </Group>
          ))
        ))}
    </Box>
  );
}
