import React, { createContext } from "react";
import dbdb from "dbdbdb";

export default function createDropboxProvider(options) {
  const db = dbdb(options);
  const DropboxContext = createContext();
  function DropboxProvider({ children }) {
    return (
      <DropboxContext.Provider value={db}>{children}</DropboxContext.Provider>
    );
  }

  return {
    DropboxContext,
    DropboxProvider
  };
}
