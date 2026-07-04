import { useState } from "react";
import { useCreateUserMutation } from "../../hooks/users/users-mutation.ts";

export const UsersCreateForm = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const createUserMutation = useCreateUserMutation();

  const handleCreateUser = () => {
    if (!username || !age) return;

    createUserMutation.mutate(
      { username, age: Number(age) },
      {
        onSuccess: () => {
          setUsername("");
          setAge("");
        },
      },
    );
  };

  return (
    <div className="flex flex-col w-full gap-2 border-2 border-gray-300 p-4 rounded-md">
      <input
        type="text"
        placeholder="Username"
        className="border-2 border-gray-300 p-2 rounded-md"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        className="border-2 border-gray-300 p-2 rounded-md"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <button
        type="button"
        disabled={createUserMutation.isPending}
        className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50"
        onClick={handleCreateUser}
      >
        {createUserMutation.isPending ? "Creating..." : "Create"}
      </button>
      {createUserMutation.isError && (
        <p className="text-red-400 text-sm">Failed to create user</p>
      )}
    </div>
  );
};
