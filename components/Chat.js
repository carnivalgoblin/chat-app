
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Chat extends React.Component {

  componentDidMount() {
    // Set name as title in componentdidmount to have it from the start before even rendering anything
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name })
  }

  render() {
    // Set Backgroundcolor variable as selected in previous screen
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