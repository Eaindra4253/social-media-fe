import { Can } from "@/components/Can";
import { DateRangeFilter } from "@/components/Filter";
import {
  DefaultMantineColor,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Skeleton,
  Stack,
  StyleProp,
  Text,
  Title,
} from "@mantine/core";
import { useDashboardReports } from "./queries";

type ReportCardProps = {
  title: string;
  total?: number;
  count?: number;
  bg?: StyleProp<DefaultMantineColor>;
};

function SkeletonLoader() {
  return (
    <>
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
    </>
  );
}

function ReportCard({ title, total, count, bg }: ReportCardProps) {
  return (
    <Paper withBorder radius="md" shadow="md" p="md" bg={bg} h="100%">
      <Stack c="white" gap="xs">
        <Title order={4}>{title}</Title>
        <Divider />
        <Flex gap="xs">
          <Stack flex={2}>
            <Flex justify="space-between">
              <Text fw="bold" fz="sm">
                Total Amount
              </Text>
              <Text fw="bold" fz="sm">
                {total ?? 0}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text fw="bold" fz="sm">
                Total Count
              </Text>
              <Text fw="bold" fz="sm">
                {count ?? 0}
              </Text>
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
      <Stack>
        <Group justify="space-between">
          <Title order={3}>Reward Coupon</Title>
          <DateRangeFilter />
        </Group>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <Grid grow>
            <Grid.Col span={{ md: 4 }}>
              <ReportCard
                title="Active"
                total={data?.rewardCoupon?.active?.amount}
                count={data?.rewardCoupon?.active?.count}
                bg="green"
              />
            </Grid.Col>
            <Grid.Col span={{ md: 4 }}>
              <ReportCard
                title="Used"
                total={data?.rewardCoupon?.used?.amount}
                count={data?.rewardCoupon?.used?.count}
                bg="orange"
              />
            </Grid.Col>
            <Grid.Col span={{ md: 4 }}>
              <ReportCard
                title="Expired"
                total={data?.rewardCoupon?.expired?.amount}
                count={data?.rewardCoupon?.expired?.count}
                bg="primary"
              />
            </Grid.Col>
          </Grid>
        )}
        <Can permission="PREMIER_LUCKY_DRAW">
          <Divider />
          <Title order={3}>Premier Lucky Draw</Title>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <Grid grow>
              <Grid.Col span={{ md: 4 }}>
                <ReportCard
                  title="Active"
                  total={data?.premierLuckyDraw?.active?.amount}
                  count={data?.premierLuckyDraw?.active?.count}
                  bg="green"
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4 }}>
                <ReportCard
                  title="Pending Payment"
                  total={data?.premierLuckyDraw?.unPaid?.amount}
                  count={data?.premierLuckyDraw?.unPaid?.count}
                  bg="orange"
                />
              </Grid.Col>
              <Grid.Col span={{ md: 4 }}>
                <ReportCard
                  title="Credited"
                  total={data?.premierLuckyDraw?.credited?.amount}
                  count={data?.premierLuckyDraw?.credited?.count}
                  bg="blue"
                />
              </Grid.Col>
            </Grid>
          )}
        </Can>
      </Stack>
    </Stack>
  );
}
