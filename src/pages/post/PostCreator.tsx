import {
  Paper,
  Text,
  Textarea,
  Group,
  Button,
  Avatar,
  Stack,
  ActionIcon,
  AspectRatio,
  rem,
  FileInput,
} from "@mantine/core";
import { IconPhoto, IconVideo, IconX } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import { useCreatePost } from "@/pages/post/queries";

interface Props {
  avatarUrl?: string;
}

export const PostCreator = ({ avatarUrl }: Props) => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const maxLength = 500;

  const createPostMutation = useCreatePost();

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video) {
      setVideoUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(video);
    setVideoUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [video]);

  const handleShare = () => {
    if (!value.trim()) return;

    const formData = new FormData();
    formData.append("title", value);
    formData.append("content", value);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    createPostMutation.mutate(formData, {
      onSuccess: () => {
        setValue("");
        setImage(null);
        setVideo(null);
      },
    });
  };

  const handleImageSelect = (file: File | null) => {
    setImage(file);
    if (file) setVideo(null);
  };

  const handleVideoSelect = (file: File | null) => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideo(file);
    if (file) setImage(null);
  };

  const clearImage = () => {
    setImage(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const clearVideo = () => {
    setVideo(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const openPhotoPicker = () => {
    photoInputRef.current?.click();
  };

  const openVideoPicker = () => {
    videoInputRef.current?.click();
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
      <Group mb="xs">
        <Group gap="sm">
          <Avatar src={avatarUrl} radius="sm" />
          <Text fw={500}>Create a post</Text>
        </Group>
      </Group>

      <Textarea
        placeholder="What's happening in your world?"
        autosize
        minRows={2}
        maxRows={4}
        value={value}
        onChange={(e) => {
          const newValue = e.currentTarget.value;
          if (newValue.length <= maxLength) {
            setValue(newValue);
          }
        }}
      />
      <Text size="sm" c="dimmed" ta="end">
        {value.length} / {maxLength}
      </Text>

      <Stack mt="sm" gap="sm">
        {image && (
          <Paper shadow="sm" radius="md" p={0} pos="relative">
            <AspectRatio ratio={16 / 9}>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: rem(8),
                }}
              />
            </AspectRatio>
            <ActionIcon
              color="red"
              size="sm"
              variant="filled"
              pos="absolute"
              top={8}
              right={8}
              onClick={clearImage}
            >
              <IconX size={16} />
            </ActionIcon>
          </Paper>
        )}

        {video && videoUrl && (
          <Paper shadow="sm" radius="md" p={0} pos="relative">
            <video
              ref={videoRef}
              key={videoUrl}
              controls
              src={videoUrl}
              preload="auto"
              muted
              onLoadedData={() => {
                videoRef.current?.play().catch((error) => {
                  console.error("Programmatic play failed:", error);
                });
              }}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "400px",
                borderRadius: rem(8),
                display: "block",
              }}
            />
            <ActionIcon
              color="red"
              size="sm"
              variant="filled"
              pos="absolute"
              top={8}
              right={8}
              onClick={clearVideo}
            >
              <IconX size={16} />
            </ActionIcon>
          </Paper>
        )}
      </Stack>

      <Group justify="space-between" mt="md">
        <Group>
          <Button
            variant="default"
            leftSection={<IconPhoto />}
            onClick={openPhotoPicker}
            radius="md"
            disabled={!!video}
          >
            Photo
          </Button>
          <FileInput
            ref={photoInputRef as any}
            style={{ display: "none" }}
            value={image}
            onChange={handleImageSelect}
            accept="image/*"
            placeholder=""
          />

          <Button
            variant="default"
            leftSection={<IconVideo />}
            onClick={openVideoPicker}
            radius="md"
            disabled={!!image}
          >
            Video
          </Button>
          <FileInput
            ref={videoInputRef as any}
            style={{ display: "none" }}
            value={video}
            onChange={handleVideoSelect}
            accept="video/*"
            placeholder=""
          />
        </Group>
      </Group>

      <Button
        fullWidth
        mt="md"
        color="gray"
        c="white"
        onClick={handleShare}
        disabled={!value.trim() || createPostMutation.isPending}
      >
        {createPostMutation.isPending ? "Sharing..." : "Share Post"}
      </Button>
    </Paper>
  );
};
