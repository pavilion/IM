import React, { useState } from "react";
import User from "./User";

type Props = {
  addUser: (user: User) => void;
};

const AddUserForm = ({ addUser }: Props) => {
  const [user, setUser] = useState();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!user?.name) return;

        addUser(user);
        setUser({ id: null, name: "" });
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user?.name}
        onChange={handleInputChange}
      />
      <button>Add new user</button>
    </form>
  );
};

export default AddUserForm;
