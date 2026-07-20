import { useForm } from "@tanstack/react-form";
import * as v from "valibot";
import { useCreateUserMutation } from "../../hooks/users/users-mutation.ts";

const createUserSchema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(2, "Username must be at least 2 characters"),
  ),
  age: v.pipe(
    v.number(),
    v.minValue(1, "Age must be at least 1"),
    v.maxValue(120, "Age must be at most 120"),
  ),
});

function fieldErrorMessage(errors: unknown[]): string | null {
  const first = errors[0];
  if (!first) return null;
  if (typeof first === "string") return first;
  if (
    typeof first === "object" &&
    first !== null &&
    "message" in first &&
    typeof first.message === "string"
  ) {
    return first.message;
  }
  return String(first);
}

export const UsersCreateForm = () => {
  const createUserMutation = useCreateUserMutation();

  const form = useForm({
    defaultValues: {
      username: "",
      age: 18,
    },
    validators: {
      onChange: createUserSchema,
    },
    onSubmit: async ({ value }) => {
      await createUserMutation.mutateAsync(value);
      form.reset();
    },
  });

  return (
    <form
      className="flex flex-col w-full gap-2 border-2 border-gray-300 p-4 rounded-md"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <p className="text-sm text-gray-400">
        TanStack Form + Valibot (Standard Schema)
      </p>

      <form.Field name="username">
        {(field) => {
          const error = fieldErrorMessage(field.state.meta.errors);
          return (
            <div className="flex flex-col gap-1">
              <input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Username"
                className="border-2 border-gray-300 p-2 rounded-md"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
              {field.state.meta.isTouched && error ? (
                <p className="text-red-400 text-sm">{error}</p>
              ) : null}
            </div>
          );
        }}
      </form.Field>

      <form.Field name="age">
        {(field) => {
          const error = fieldErrorMessage(field.state.meta.errors);
          return (
            <div className="flex flex-col gap-1">
              <input
                id={field.name}
                name={field.name}
                type="number"
                placeholder="Age"
                className="border-2 border-gray-300 p-2 rounded-md"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(event.target.valueAsNumber || 0)
                }
              />
              {field.state.meta.isTouched && error ? (
                <p className="text-red-400 text-sm">{error}</p>
              ) : null}
            </div>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit || createUserMutation.isPending}
            className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50"
          >
            {isSubmitting || createUserMutation.isPending
              ? "Creating..."
              : "Create"}
          </button>
        )}
      </form.Subscribe>

      {createUserMutation.isError && (
        <p className="text-red-400 text-sm">Failed to create user</p>
      )}
    </form>
  );
};
