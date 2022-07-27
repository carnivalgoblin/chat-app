
import React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import PropTypes from 'prop-types';

// import Gifted Chat Library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  // Apps main screen for chatting functionality. Name and backgroundcolor the user choose on the start screen will be used here

  constructor() {
    super();
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    // Set name as title in componentdidmount to have it from the start before even rendering anything. Name is passed in via props
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name })

    // Set default message for testing purposes
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: this.props.route.params.name + ' has entered the chat',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  // Function to customize rendering of bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  // Function to specify behavior when tapping send
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    // Set Backgroundcolor variable as selected in previous screen. Passed in via props
    let color = this.props.route.params.bgColor;


    return (
      // Backgroundcolor from variable, other styling from stylesheet
      <View style={[{ backgroundColor: color }, styles.container]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
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