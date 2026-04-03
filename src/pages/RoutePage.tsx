import { Stack, Text, Title } from '@mantine/core'

export function RoutePage() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={1}>Route</Title>
        <Text c="osrsGold.5">Plan your task order</Text>
      </div>
      <hr className="divider" />
      <Text c="osrsGold.5" size="sm">Coming soon</Text>
    </Stack>
  )
}
