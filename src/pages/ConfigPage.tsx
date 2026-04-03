import { Stack, Text, Title } from '@mantine/core'

export function ConfigPage() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={1}>Config</Title>
        <Text c="osrsGold.5">Settings, export, and import</Text>
      </div>
      <hr className="divider" />
      <Text c="osrsGold.5" size="sm">Coming soon</Text>
    </Stack>
  )
}
