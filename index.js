'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var dbdb = _interopDefault(require('dbdbdb'));

function createDropboxProvider(options) {
  const db = dbdb(options);
  const DropboxContext = React.createContext();

  function DropboxProvider({
    children
  }) {
    return React__default.createElement(DropboxContext.Provider, {
      value: db
    }, children);
  }

  function useDropboxClient() {
    const dropboxClient = React.useContext(DropboxContext);
    const {
      getClient,
      logOutDropbox
    } = dropboxClient;
    const [client, setClient] = React.useState(getClient());
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

module.exports = createDropboxProvider;
