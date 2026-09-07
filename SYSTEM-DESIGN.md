# UI Component Design System: Dark Chat Theme

This design system translates a modern dark-mode chat interface into clean, reusable React Native component abstractions. Built around dark-mode surface elevation, high-contrast typography, and vibrant accent highlights.

---

## 1. Design Tokens & Palette

### Brand & Surface Colors

- **Brand Accent:** `#5865F2` (Primary Blurple)
- **Status Green:** `#23A55A` (Online / Success)
- **Status Yellow:** `#F0B232` (Idle / Warning)
- **Status Red:** `#F23F43` (DND / Error / Destructive)
- **Background Primary:** `#313338` (Chat background / Main canvas)
- **Background Secondary:** `#2B2D31` (Sidebar / Channel list)
- **Background Tertiary:** `#1E1F22` (Server list / Darkest background)
- **Surface Floating:** `#111214` (Popovers / Context menus)
- **Input Outer / Dark:** `#1E1F22`

### Typography & Text Colors

- **Text Normal:** `#DBDEE1`
- **Text Muted:** `#949BA4`
- **Text Heading:** `#F2F3F5`
- **Text Link:** `#00A8FC`
- **Font Family:** `sans-serif` (Fall back to `System` or `Roboto` on Android, `SF Pro Display` on iOS)

---

## 2. Base Scale & Radius

- **Corner Radius Scale:**
- Small (Buttons, Badges): `4px`
- Medium (Inputs, Cards): `8px`
- Large (Modals, Floating Surfaces): `16px`
- Circular (Avatars): `50%` (or `width / 2`)

- **Spacing Scale:**
- `xs`: `4px` | `sm`: `8px` | `md`: `12px` | `lg`: `16px` | `xl`: `24px`

---

## 3. Core Component Library Specification

### Primary Button (`AppButton`)

A versatile button supporting main actions, destructive actions, and neutral states.

```tsx
import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost"

interface AppButtonProps {
  label: string
  onPress: () => void
  variant?: ButtonVariant
  fullWidth?: boolean
  disabled?: boolean
}

export const AppButton: React.FC<AppButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.text, variant === "ghost" && styles.ghostText]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  fullWidth: {
    width: "100%",
  },
  primary: {
    backgroundColor: "#5865F2",
  },
  secondary: {
    backgroundColor: "#4E5058",
  },
  danger: {
    backgroundColor: "#DA373C",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  ghostText: {
    color: "#DBDEE1",
  },
})
```

---

### Avatar with Status Indicator (`UserAvatar`)

Displays user profile pictures with optional online status badges.

```tsx
import React from "react"
import { View, Image, StyleSheet } from "react-native"

type UserStatus = "online" | "idle" | "dnd" | "offline"

interface UserAvatarProps {
  sourceUrl: string
  size?: number
  status?: UserStatus
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  sourceUrl,
  size = 40,
  status,
}) => {
  const statusColorMap: Record<UserStatus, string> = {
    online: "#23A55A",
    idle: "#F0B232",
    dnd: "#F23F43",
    offline: "#80848E",
  }

  const badgeSize = Math.max(10, Math.floor(size * 0.3))

  return (
    <View style={{ width: size, height: size }}>
      <Image
        source={{ uri: sourceUrl }}
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
      {status && (
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: statusColorMap[status],
              right: 0,
              bottom: 0,
            },
          ]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#2B2D31",
  },
  badge: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#1E1F22",
  },
})
```

---

### Channel List Item (`ChannelItem`)

Represents text and voice channels with selection highlights.

```tsx
import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

interface ChannelItemProps {
  name: string
  type?: "text" | "voice"
  isActive?: boolean
  unread?: boolean
  onPress: () => void
}

export const ChannelItem: React.FC<ChannelItemProps> = ({
  name,
  type = "text",
  isActive = false,
  unread = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, isActive && styles.activeContainer]}
    >
      <Text style={[styles.prefix, isActive && styles.activeText]}>
        {type === "text" ? "#" : "🔊"}
      </Text>
      <Text
        style={[
          styles.label,
          unread && styles.unreadText,
          isActive && styles.activeText,
        ]}
        numberOfLines={1}
      >
        {name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginVertical: 2,
  },
  activeContainer: {
    backgroundColor: "rgba(78, 80, 88, 0.6)",
  },
  prefix: {
    color: "#80848E",
    fontSize: 16,
    marginRight: 8,
    fontWeight: "bold",
  },
  label: {
    color: "#949BA4",
    fontSize: 15,
    fontWeight: "500",
  },
  unreadText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  activeText: {
    color: "#FFFFFF",
  },
})
```

---

### Chat Input Bar (`ChatInput`)

Recreates a sleek dark input box with action triggers.

```tsx
import React from "react"
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native"

interface ChatInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  onSend?: () => void
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  placeholder = "Message",
  onSend,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.attachButton}>
        <Text style={styles.attachIcon}>+</Text>
      </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='#80848E'
        style={styles.input}
        multiline
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#383A40",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 44,
  },
  attachButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4E5058",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  attachIcon: {
    color: "#B5BAC1",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -2,
  },
  input: {
    flex: 1,
    color: "#DBDEE1",
    fontSize: 15,
    paddingVertical: 4,
  },
})
```

---

## 4. Usage Guidelines

1. **Layer Hierarchy:**

- Ground layer (Navigation Rails): `#1E1F22`
- Mid layer (Channel Bar / Drawer): `#2B2D31`
- Main content (Chat View): `#313338`
- Input/Overlay elements: `#383A40` or `#111214`

2. **Interactive States:**

- Active items use a semi-transparent gray `#4E5058` overlay or full contrast white text.
- Primary user call-to-actions should strictly use `#5865F2` (Accent Blurple).
