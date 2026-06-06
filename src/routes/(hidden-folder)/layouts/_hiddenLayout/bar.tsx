import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(hidden-folder)/layouts/_hiddenLayout/bar',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(hidden-folder)/layouts/_hiddenLayout/bar"!</div>
}
