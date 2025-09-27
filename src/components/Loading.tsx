import {
  Box,
  Center,
  Loader,
  Stack,
  useMantineTheme,
} from "@mantine/core";

export function Loading() {
  const theme = useMantineTheme();

  return (
    <Box bg="white">
      <Center h="50vh">
        <Stack align="center">
          <Loader color={theme.colors.primary[5]} />
        </Stack>
      </Center>
    </Box>
  );
}


