import React, { useState } from "react";
import AddUserForm from "./AddForm";
import EditUserForm from "./EditForm";
import UserTable from "./Table";
import User from "./User";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState();
  const [editing, setEditing] = useState(false);
  const [randomUserName, setRandomUserName] = useState();
  const [prevRandomUserName, setPrevRandomUserName] = useState();

  const addUser = (user: User) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id: number) => {
    setEditing(false);

    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (id: number, updatedUser: User) => {
    setEditing(false);

    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  const editRow = (user: User) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name });
  };

  const computeRandomUserName = (users: User[]) => {
    const randomUserName = users[(users.length * Math.random()) | 0]?.name;
    if (prevRandomUserName !== randomUserName) {
      setRandomUserName(randomUserName);
      setPrevRandomUserName(randomUserName);
    } else if (users.length > 1) {
      computeRandomUserName(users);
    }
  };

  return (
    <div>
      <button onClick={() => computeRandomUserName(users)}>
        DISPLAY RANDOM USER
      </button>
      <h1>{randomUserName && randomUserName}</h1>
      <div>
        {editing ? (
          <>
            <h2>Edit user</h2>
            <EditUserForm
              editing={editing}
              setEditing={setEditing}
              currentUser={currentUser}
              updateUser={updateUser}
            />
          </>
        ) : (
          <>
            <h2>Add user</h2>
            <AddUserForm addUser={addUser} />
          </>
        )}
      </div>
      <div>
        <h2>View users</h2>
        <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
      </div>
    </div>
  );
};

export default App;
