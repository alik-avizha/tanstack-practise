import { createFileRoute } from "@tanstack/react-router";
import { isAuthenticated, signIn, signOut } from "../utils/auth.ts";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  return (
    <>
      <h2>Login</h2>

      {authenticated ? (
        <>
          <p>Hello user!</p>
          <button
            onClick={() => {
              signOut();
              setAuthenticated(false);
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            signIn();
            setAuthenticated(true);
          }}
        >
          Sign in
        </button>
      )}
    </>
  );
}
