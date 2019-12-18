import React, { useState, useEffect } from "react";
import User from "./User";

type Props = {
  editing: boolean;
  setEditing: (editing: boolean) => void;
  currentUser: User;
  updateUser: (id: number, user: User) => void;
};

const EditUserForm = ({
  editing,
  setEditing,
  currentUser,
  updateUser
}: Props) => {
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUser(currentUser);
  }, [editing, setEditing, currentUser, updateUser]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        updateUser(user.id, user);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />
      <button>Update user</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </form>
  );
};

export default EditUserForm;
