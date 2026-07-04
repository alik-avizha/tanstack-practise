import { useState } from "react";
import type { User } from "../api/users.ts";
import { useDeleteUserMutation } from "../hooks/users/users-mutation.ts";
import { useUsersQuery } from "../hooks/users/users-query.ts";

const PAGE_SIZE = 5;

function UserItem({
  user,
  disabled,
}: {
  user: User;
  disabled: boolean;
}) {
  const deleteUserMutation = useDeleteUserMutation();

  return (
    <div
      className={`flex gap-2 border-2 border-gray-300 p-2 rounded-md ${disabled ? "opacity-50" : ""}`}
    >
      <span>{user.id}</span>
      <span>{user.username}</span>
      <span>{user.age}</span>
      <button
        type="button"
        className="bg-red-500 text-white p-2 rounded-md disabled:opacity-50"
        disabled={disabled || deleteUserMutation.isPending}
        onClick={() => deleteUserMutation.mutate(user.id)}
      >
        {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export const UsersList = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, isError, error } = useUsersQuery({
    page,
    limit: PAGE_SIZE,
  });

  const total = data?.total ?? 0;
  const users = data?.data ?? [];
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-400">
        Failed to load users:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">Всего пользователей: {total}</h2>
        <p className="text-gray-400">
          Страница {page} из {totalPages}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <UserItem disabled={isFetching} key={user.id} user={user} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="border-red-500 border-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1"
          disabled={page <= 1 || isFetching}
          onClick={() => setPage((current) => current - 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              type="button"
              className={`border-2 cursor-pointer px-3 py-1 ${
                pageNumber === page
                  ? "border-neon-cyan text-neon-cyan"
                  : "border-red-500"
              }`}
              disabled={isFetching}
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          type="button"
          className="border-red-500 border-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1"
          disabled={page >= totalPages || isFetching}
          onClick={() => setPage((current) => current + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
