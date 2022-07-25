
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Chat extends React.Component {

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name })
  }

  render() {
    let color = this.props.route.params.bgColor;


    return (
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