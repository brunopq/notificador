import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [{ title: "Notificador" }]
}

export default function Index() {
  return (
    <div className="">
      <h1 className="font-semibold text-2xl">Hello, world!</h1>
    </div>
  )
}
