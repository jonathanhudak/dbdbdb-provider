import ReactDOM from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import createDropboxProvider from ".";

const {
  DropboxContext,
  DropboxProvider,
  withDropboxClient
} = createDropboxProvider({
  clientId: "xhb23gwddzfsp8k",
  authRedirect: process.env.LOGIN_REDIRECT
});

const root = document.getElementById("root");

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { client, logout } = withDropboxClient();
  useEffect(() => {
    client.usersGetCurrentAccount().then(setUserInfo);
  }, []);

  return userInfo ? (
    <div>
      <div>
        <h2>{userInfo.name.familiar_name}</h2>
        <img
          style={{ borderRadius: "50%" }}
          with={50}
          height={50}
          src={userInfo.profile_photo_url}
          alt={userInfo.name.display_name}
        />
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  ) : (
    "loading..."
  );
};

function DatabaseEditor() {
  const editorRef = useRef(null);
  const [error, setError] = useState(null);
  const { client, readDatabase, saveDatabase } = withDropboxClient();
  const [database, setDatabase] = useState(null);

  if (!client) return null;

  useEffect(() => {
    readDatabase().then(database => {
      setDatabase(database || {});
    });
  }, []);

  if (!database) return <div>Loading database...</div>;

  function save({ target }) {
    try {
      const database = JSON.parse(editorRef.current.value);
      saveDatabase({ data: database });
      setError(null);
    } catch (e) {
      setError(e.toString());
    }
  }

  return (
    <div>
      <h2>JSON Database Editor</h2>
      <textarea
        ref={editorRef}
        cols={100}
        rows={15}
        defaultValue={JSON.stringify(database, null, 2)}
      />
      <button onClick={save}>Save</button>
      {error && <p style={{ color: "tomato" }}>{error}</p>}
    </div>
  );
}

function Header() {
  const { client, authUrl } = withDropboxClient();

  return <header>{client ? <UserInfo /> : <a href={authUrl}>Login</a>}</header>;
}

function App() {
  return (
    <DropboxProvider>
      <Header />
      <DatabaseEditor />
    </DropboxProvider>
  );
}

ReactDOM.render(<App />, root);
