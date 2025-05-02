import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPhone, IconPlus, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useGetSettings, useUpdateSetting } from "./query";

export function Settings() {
  const { data, isLoading } = useGetSettings();
  const { mutate, isPending } = useUpdateSetting();

  const [isEnableWhiteList, setIsEnableWhiteList] = useState<boolean>(false);
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (data) {
      setIsEnableWhiteList(data.enableWhiteList);
      setWhitelist(data.whiteList.split(",", -1));
    }
  }, [data]);

  const handleSave = () => {
    mutate({
      enableWhiteList: isEnableWhiteList,
      whiteList: whitelist.join(","),
    });
  };

  return (
    <Stack>
      <Title order={3}>Settings</Title>
      <Checkbox
        disabled={isLoading}
        checked={isEnableWhiteList}
        size="xs"
        label="Enable Whitelist"
        onChange={(e) => setIsEnableWhiteList(e.target.checked)}
      />
      <Flex align="end" gap="sm">
        <TextInput
          size="xs"
          value={phone}
          leftSectionWidth={35}
          leftSection={<IconPhone size={16} />}
          w={250}
          onChange={(e) => setPhone(e.target.value)}
          label="Phone Number"
          placeholder="Enter whitelist phone number"
        />
        <Button
          disabled={isLoading}
          size="xs"
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            if (phone) {
              setWhitelist((prev) => [...prev, phone]);
              setPhone("");
            }
          }}
        >
          Add
        </Button>
      </Flex>
      <Paper p="md" withBorder>
        <Stack gap="sm">
          <Title order={4}>Whitelist</Title>
          <Divider />
          {whitelist.length === 0 && <Text>No Whitelist</Text>}
          {whitelist.map((item) => (
            <Flex key={item} gap="sm" align="center">
              <IconPhone size={16} />
              <Text w={200}>{item}</Text>
              <Button
                leftSection={<IconX size={16} />}
                size="xs"
                variant="outline"
                color="red"
                onClick={() =>
                  setWhitelist(whitelist.filter((i) => i !== item))
                }
              >
                Remove
              </Button>
            </Flex>
          ))}
        </Stack>
      </Paper>
      <Group justify="end">
        <Button disabled={isPending} loading={isPending} onClick={handleSave}>
          Save
        </Button>
      </Group>
    </Stack>
  );
}
