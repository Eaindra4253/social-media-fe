import React from "react";
import { FileInput, Button, Box, Text } from "@mantine/core";

export default function VideoInput(props: any) {
  const { width, height } = props;

  const [file, setFile] = React.useState(null);
  const [source, setSource] = React.useState(null);

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setSource(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setSource(null);
    }
  }, [file]);

  const handleFileChange = (newFile: any) => {
    setFile(newFile);
  };

  return (
    <Box
      className="VideoInput"
      w={width || "100%"}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <FileInput
        label="Upload Video"
        placeholder="Click to select a .mp4 or .mov file"
        accept="video/mp4,video/quicktime"
        value={file}
        onChange={handleFileChange}
        clearable
      />

      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height={height || "auto"}
          controls
          src={source}
          style={{ maxWidth: "100%", borderRadius: "4px" }}
        />
      )}

      <Text size="sm" color="dimmed" className="VideoInput_footer">
        {file ? `Selected: ${file}` : "No video selected"}
      </Text>

      {file && (
        <Button
          variant="light"
          color="red"
          onClick={() => setFile(null)}
          style={{ marginTop: "10px" }}
        >
          Clear Video
        </Button>
      )}
    </Box>
  );
}
