import { createFileRoute, redirect, useBlocker } from "@tanstack/react-router";
import { type ChangeEvent, useState } from "react";

export const Route = createFileRoute("/profile")({
  beforeLoad: ({ context }) => {
    const { isLogged } = context.authentication;
    if (!isLogged()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const { proceed, reset, status } = useBlocker({
    condition: !!name,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  return (
    <div>
      <h1>Hello "/profile"!</h1>
      <input type="text" value={name} onChange={onChange} />
      {status === "blocked" && (
        <div>
          <div>You might have some unsaved changes in this page.</div>
          <div>
            <button onClick={reset}>Cancel</button>
            <button onClick={proceed}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}
