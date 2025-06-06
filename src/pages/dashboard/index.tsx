import { DateRangeFilter } from "@/components/Filter";
import {
  Center,
  DefaultMantineColor,
  Divider,
  Flex,
  Grid,
  Group,
  Loader,
  Paper,
  Stack,
  StyleProp,
  Text,
  Title,
} from "@mantine/core";
import { useDashboardReports } from "./queries";

export function ReportCard({
  title,
  total,
  count,
  bg,
}: {
  title: string;
  total?: number;
  count?: number;
  bg?: StyleProp<DefaultMantineColor>;
}) {
  return (
    <Paper withBorder radius="md" shadow="md" p="md" bg={bg} h="100%">
      <Stack c="white" gap="xs">
        <Title order={3}>{title}</Title>
        <Divider />
        <Flex gap="xs">
          <Stack flex={2}>
            <Flex justify="space-between">
              <Text fw="bold">AMOUNT</Text>
              <Text fw="bold">{total ?? 0}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fw="bold">COUNT</Text>
              <Text fw="bold">{count ?? 0}</Text>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Paper>
  );
}

export function DashboardPage() {
  const { isLoading, data } = useDashboardReports();

  return (
    <Stack>
      <Group justify="right">
        <DateRangeFilter />
      </Group>
      {isLoading ? (
        <Center h="40vh">
          <Loader />
        </Center>
      ) : (
        <Grid grow>
          <Grid.Col span={4}>
            <ReportCard
              title="Active"
              total={data?.activeCount}
              count={data?.active}
              bg="green"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <ReportCard
              title="Used"
              total={data?.usedCount}
              count={data?.used}
              bg="orange"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <ReportCard
              title="Expired"
              total={data?.expiredCount}
              count={data?.expired}
              bg="primary"
            />
          </Grid.Col>
        </Grid>
      )}
    </Stack>
  );
}
