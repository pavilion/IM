import * as React from "react";
import User from "./User";

type Props = {
  users: User[];
  editRow: (user: User) => void;
  deleteUser: (id: number) => void;
};

const UserTable = ({ users, editRow, deleteUser }: Props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>
              <button
                onClick={() => {
                  editRow(user);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default UserTable;
