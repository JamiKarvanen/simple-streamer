import React from 'react'
import logo from './logo.svg'
import './App.css'
import Chat from './Chat'

import { fetchMessages, sendMessage, receiveMessage } from './network'

//const createMessage = (message) => {
//  return { time: Date.now(), user: 'temmu', message }
//}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
  componentDidMount() {
    fetchMessages().then(messages=> {
      this.setState({
        messages
      });
      receiveMessage(this.onReceiveMessage.bind(this))
    });
  }
  onReceiveMessage(message) {
    console.log('receiving message', message)
    this.setState({ messages: [...this.state.messages, message] })
  }
  onSendMessage(message) {
    console.log('sending message', message)
    sendMessage(message)
  }
  render() {
    return (
      <div className="App">
        <Chat onSendMessage={this.onSendMessage.bind(this)} messages={this.state.messages} />
      </div>
    )
  }
}

export default App;
