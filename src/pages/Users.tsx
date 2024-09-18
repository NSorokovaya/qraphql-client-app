import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, DELETE_USER, GET_USERS } from "../queries/users";
import { useState } from "react";

export default function Users() {
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreateUser = async () => {
    await createUser({ variables: { username, password } });
    setUsername("");
    setPassword("");
    refetch();
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        after: data.users.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.users.edges;
        const pageInfo = fetchMoreResult.users.pageInfo;

        return newEdges.length
          ? {
              users: {
                __typename: previousResult.users.__typename,
                edges: [...previousResult.users.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };
  console.log(data.users.edges);
  return (
    <div>
      <h2>Users Admin Panel</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <div>
        {data && data.users.edges.length > 0 ? (
          <ul>
            {data.users.edges.map((user: any) => (
              <li key={user.node.id}>
                {user.node.username}
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
        {data.users.pageInfo.hasNextPage && (
          <button onClick={handleLoadMore}>Load More</button>
        )}
      </div>
    </div>
  );
}
