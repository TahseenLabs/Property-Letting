import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ManageUsers() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetch("/api/users/all")
        .then((res) => res.json())
        .then((data) => setUsers(data.users || []));
    }
  }, [session]);

  const handleDelete = async (userId) => {
    const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });

    if (res.ok) {
      // Filtering out deleted user 
      setUsers(users.filter((user) => user.user_id !== userId));
    } else {
      const errorData = await res.json();
      alert(errorData.message); // Showing error if deletion fails
    }
  };

  if (!session) return <p>Loading...</p>;
  if (session.user.role !== "admin") return <p>Access Denied</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Users</h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.user_id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between text-center border border-gray-200"
            >
              <p className="mb-2">
                <strong>ID:</strong> {user.user_id}
              </p>
              <p className="mb-2">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="mb-4">
                <strong>Role:</strong> {user.role}
              </p>
              <button
                onClick={() => handleDelete(user.user_id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
