import React, { createContext } from 'react';
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

  return {
    DropboxContext,
    DropboxProvider
  };
}

export default createDropboxProvider;
