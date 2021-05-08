import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import { useMutation } from "@apollo/client"



class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}


const QUERY_HELLO = gql`
  query {
    hello
  }
`

const MUTATION_FILE = gql`
mutation upload($file: Upload!) {
  singleUpload(file: $file) {
    encoding
    filename
  }
}
`


const ApolloTest = () => {

  const [uploadFile] = useMutation(MUTATION_FILE, {
    onCompleted: data => console.log(data),
    onError: error => console.error(error)
  })

  const handleChange = async (e) => {
    const file = e.target.files[0]
    uploadFile({variables: {file}})

  }

  return (
    <div>
      <h3>File Upload</h3>
      <input type="file" onChange={handleChange}/>


      <div>
            <br/>
            <br/>
            <h3>Form Data Upload</h3>
            <input type="file" multiple onChange={handleChange}/>
      </div>


      {/* <Query query={QUERY_HELLO}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;
  
          return (
            <h2> title={data.hello}</h2>
          )
        }}
      </Query> */}


      {/* <Mutation mutation={MUTATION_FILE}>
        {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;
            console.log(data)
            return (
              <h2> title={data?.singleUpload?.filename}</h2>
            )
          }}
      </Mutation> */}


    </div>
  )
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloTest/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
