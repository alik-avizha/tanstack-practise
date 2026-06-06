import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(hidden-folder)/layouts/visibleLayout/foo',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(hidden-folder)/layouts/visibleLayout/foo"!</div>
}
