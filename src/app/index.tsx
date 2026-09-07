import { Div } from "@/components/ui/div"
import { Message } from "@/components/ui/message"
import { Link, LinkProps } from "expo-router"
import { useWindowDimensions } from "react-native"

type Item = {
  href: LinkProps["href"]
  label: string
}

export default function HomeScreen() {
  const { width } = useWindowDimensions()
  const items: Item[] = [
    { href: "/counter-clicker", label: "Counter Clicker" },
    { href: "/counter-day", label: "Counter Day" },
    {
      href: "/salat",
      label: "Salat",
    },
  ]

  return (
    <Div style={{ gap: 10, flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
      {items.map((item, index) => {
        return (
          <Link key={index} href={item.href}>
            <Div
              style={{
                width: (width - 26) / 2,
                backgroundColor: "red",
                height: 100,
              }}
            >
              <Message type='h1'>{item.label}</Message>
            </Div>
          </Link>
        )
      })}
      {__DEV__ ? (
        <Link key='dev' href='/dev'>
          <Div>
            <Message type='h1'>{"Playground"}</Message>
          </Div>
        </Link>
      ) : null}
    </Div>
  )
}
