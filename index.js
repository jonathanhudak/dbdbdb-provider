import React, { createContext, useContext, useState } from 'react';
import dbdb from 'dbdbdb';

function createDropboxProvider(options) {
  const db = dbdb(options);
  const DropboxContext = createContext();

  function DropboxProvider({
    children
  }) {
    return React.createElement(DropboxContext.Provider, {
      value: db
    }, children);
  }

  function useDropboxClient() {
    const dropboxClient = useContext(DropboxContext);
    const {
      getClient,
      logOutDropbox
    } = dropboxClient;
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

export default createDropboxProvider;
