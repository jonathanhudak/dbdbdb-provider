import ReactDOM from "react-dom";
import React, { useContext } from "react";
import createDropboxProvider from ".";

const { DropboxContext, DropboxProvider } = createDropboxProvider({
  clientId: "xhb23gwddzfsp8k"
});

const root = document.getElementById("root");

function Header() {
  const db = useContext(DropboxContext);
  return (
    <header>
      header <pre>{JSON.stringify(db, null, 2)}</pre>
    </header>
  );
}

function App() {
  return (
    <DropboxProvider>
      <Header />
    </DropboxProvider>
  );
}

ReactDOM.render(<App />, root);
