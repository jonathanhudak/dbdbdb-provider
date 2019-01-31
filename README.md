# dbdbdb-provider

A library to more easily use [dbdbdb](https://github.com/jonathanhudak/dbdbdb) with React.

## Install
1. Complete [prerequisites](https://github.com/jonathanhudak/dbdbdb#prerequisites)
2. Install this module `npm i dbdbdb-provider --save`

## Usage
See [demo](https://github.com/jonathanhudak/dbdbdb-provider/blob/master/demo.js) for usage with react@next.

Basic usage:
```js
import React from 'react';
import ReactDOM from 'react-dom';

const {
  DropboxContext,
  DropboxProvider,
} = createDropboxProvider({
  clientId: "xhb23gwddzfsp8k"
});


class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { client: null };
  }
  componentDidMount() {
    const client = this.context.getClient();
    this.setState({ client });
    if (client) {
      client.usersGetCurrentAccount().then(userInfo => {
        this.setState({ userInfo });
      });
    }
  }
  render() {
    if (!this.state.client) {
      return <a href={this.context.authUrl}>Login</a>;
    }

    if (this.state.client && !this.state.userInfo) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>{this.state.userInfo.name.familiar_name}</h2>
        <img
          with={50}
          height={50}
          src={this.state.userInfo.profile_photo_url}
          alt={this.state.userInfo.name.display_name}
        />
      </div>
    );
  }
}

MyApp.contextType = DropboxContext;

function App() {
  return (
    <DropboxProvider>
      <MyApp />
    </DropboxProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```
