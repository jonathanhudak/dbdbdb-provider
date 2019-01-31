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

  function withDropboxClient() {
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
    withDropboxClient
  };
}

export default createDropboxProvider;
