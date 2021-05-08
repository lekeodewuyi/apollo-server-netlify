import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import ApolloClient from "apollo-boost";

// import {ApolloProvider} from "react-apollo"

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'



// const client = new ApolloClient({
//     // uri: "/.netlify/functions/graphql"
//     uri: "http://localhost:9000/graphql"

// });

const client = new ApolloClient({
    link: createUploadLink({
        // uri: "/.netlify/functions/graphql"
        uri: "http://localhost:9000/graphql"
    }),
    cache: new InMemoryCache()
  })

const ApolloApp = AppComponent => (
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider>
);


// ReactDOM.render(
//     <App />, 
//     document.getElementById('root')
// );

ReactDOM.render(
    ApolloApp(App),
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
