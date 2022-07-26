
import React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import PropTypes from 'prop-types';

// import NetInfo
import NetInfo from '@react-native-community/netinfo';

// import asyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Gifted Chat Library
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAeZa27BSJ6NIBWjqf60erHL8ZtaygeQN0",
  authDomain: "chat-a9801.firebaseapp.com",
  projectId: "chat-a9801",
  storageBucket: "chat-a9801.appspot.com",
  messagingSenderId: "324204979640",
  appId: "1:324204979640:web:264df16c9c6b7c1a6e1b4d"
};

export default class Chat extends React.Component {
  // Apps main screen for chatting functionality. Name and backgroundcolor the user choose on the start screen will be used here

  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      isConnected: null
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  //get messages from async storage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // save current state of messages to async storage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete messages from async storage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    // Set name as title in componentdidmount to have it from the start before even rendering anything. Name is passed in via props
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name })

    // get message from ayncStorage
    this.getMessages();

    // Reference to load messages via Firebase
    this.referenceMessages = firebase.firestore().collection("messages");

    // listen to authentication events
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      //update user state with currently active user data
      this.setState({
        user: {
          _id: user.uid,
          name: name
        }
      });

      // listen for changes in collection
      this.unsubscribe = this.referenceMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
    });

    // check for online status
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        // load messages from firebase
        this.referenceMessages = firebase.firestore().collection('messages');
        // listen to authentication events
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          //update user state with currently active user data
          this.setState({
            user: {
              _id: user.uid,
              name: name
            }
          });

          // listen for changes in collection
          this.unsubscribe = this.referenceMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        this.setState({ isConnected: false });
        this.getMessages();
      }
    });
  };

  //stop listeners
  componentWillUnmount() {
    if (this.isConnected) {
      this.unsubscribe();
      this.authUnsubscribe();
    }
  }


  // add message
  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: message.user
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text.toString(),
        user: {
          _id: data.user._id,
          avatar: data.user.avatar,
          name: data.user.name,

        }
      });
    });
    this.setState({
      messages,
    });
  }

  // Function to customize rendering of bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fff',
          },
          right: {
            backgroundColor: '#59CE8F'
          }
        }}
      />
    )
  }

  // customize behavior and style of input bar
  renderInputToolbar(props) {
    if (this.state.isConnected === false) {

    } else {
      return (
        <InputToolbar {...props} />
      )
    }
  }

  // Function to specify behavior when tapping send
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
      this.saveMessages();
    });
  }

  render() {
    // Set Backgroundcolor variable as selected in previous screen. Passed in via props
    let color = this.props.route.params.bgColor;


    return (
      // Backgroundcolor from variable, other styling from stylesheet
      <View style={[{ backgroundColor: color }, styles.container]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.user.name,
          }}
        />
        {/* Fix for Android keyboard hiding message input */}
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  text: {
    color: '#ffffff'
  },
});

Chat.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bgColor: PropTypes.string
    }).isRequired
  }).isRequired
}