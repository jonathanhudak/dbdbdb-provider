import React, { createContext, useContext, useState } from "react";
import dbdb from "dbdbdb";

export default function createDropboxProvider(options) {
  const db = dbdb(options);
  const DropboxContext = createContext();
  function DropboxProvider({ children }) {
    return (
      <DropboxContext.Provider value={db}>{children}</DropboxContext.Provider>
    );
  }

  function useDropboxClient() {
    const dropboxClient = useContext(DropboxContext);
    const { getClient, logOutDropbox } = dropboxClient;
    const [client, setClient] = useState(getClient());

    return {
      client,
      ...dropboxClient,
      logout: () => {
        logOutDropbox();
        setClient(null);
      }
    };
  }

  return {
    DropboxContext,
    DropboxProvider,
    useDropboxClient
  };
}
