
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from 'prop-types';

export default class Chat extends React.Component {
  // Apps main screen for chatting functionality. Name and backgroundcolor the user choose on the start screen will be used here

  componentDidMount() {
    // Set name as title in componentdidmount to have it from the start before even rendering anything. Name is passed in via props
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name })
  }

  render() {
    // Set Backgroundcolor variable as selected in previous screen. Passed in via props
    let color = this.props.route.params.bgColor;


    return (
      // Backgroundcolor from variable, other styling from stylesheet
      <View style={[{ backgroundColor: color }, styles.container]}>
        <Text style={styles.text}>Let's chat!</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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