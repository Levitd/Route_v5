import React from "react";
import { Link, Switch, Route, useParams, Redirect } from "react-router-dom";

const users = ["User01", "User02", "User03", "User04", "User05"];

const MainPage = () => {
  return (
    <>
      <h1>MainPage</h1>
      <Link to="/users">User List</Link>
    </>);
};
const UserList = () => {
  const params = useParams();
  return (
    <>
      <h1>UserList</h1>
      <ul>
        <>{users.map((user, idx) => <li key={`list_${idx + 1}`}><Link to={"/users/" + (idx + 1)}>{user}</Link></li>)}</>
      </ul>
      <hr />
      <Link to="/">Main Page</Link>
    </>);
};
const UserPage = () => {
  const { userId } = useParams();
  const url = "/users/" + userId + "/profile/edit";
  return (
    <>
      <h1>UserPage</h1>
      <h3>User: {(users[userId - 1]) ? users[userId - 1] : userId}</h3>
      <Link to={url}>User Edit Page</Link>
      <hr />
      <Link to="/users">User List</Link>
    </>);
};
const UserPageEdit = () => {
  const { userId } = useParams();
  const url = "/users/" + userId + "/profile";
  const urlAnotherUser = "/users/" + (isNaN(Number(userId)) || (Number(userId) >= 5) ? 1 : Number(userId) + 1) + "/profile";
  return (
    <>
      <h1>UserPageEdit</h1>
      <h3>User: {(users[userId - 1]) ? users[userId - 1] : userId}</h3>
      <Link to={url}>User Page</Link>
      <br />
      <Link to={urlAnotherUser}>Another User Page</Link>
      <hr />
      <Link to="/users">User List</Link>
    </>);
};

function App() {
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/users" exact component={UserList} />
      <Route path="/users/:userId/profile" exact component={UserPage} />
      <Route path="/users/:userId/profile/edit" exact component={UserPageEdit} />
      <Redirect from="/users/:userId" to="/users/:userId/profile" />
      <Route render={() => (<Redirect to="/" />)} />
    </Switch>
  );
}

export default App;
