import { createFileRoute } from "@tanstack/react-router";
import { UsersList } from "../compoents/users-list.tsx";
import { UsersCreateForm } from "../compoents/navigation/users-create-form.tsx";

export const Route = createFileRoute("/users")({
  component: RouteComponent,
  staticData: { breadcrumb: "Users" },
});

function RouteComponent() {
  return (
    <div className={"flex flex-col gap-4"}>
      <UsersCreateForm />
      <UsersList />
    </div>
  );
}
