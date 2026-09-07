import { useTheme } from "@/stores/theme"
import { Stack, useRouter } from "expo-router"
import { useEffect } from "react"

export default function Layout() {
  const colors = useTheme((s) => s.colors)
  const router = useRouter()

  useEffect(() => {
    if (!__DEV__) {
      router.replace("/")
    }
  }, [])

  if (!__DEV__) return null

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.bg_primary,
        },
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          headerShown: false, // Hides native header since HomeScreen renders its own custom header
        }}
      />
    </Stack>
  )
}
