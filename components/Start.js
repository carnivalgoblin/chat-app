import React from "react";

import { StyleSheet, View, Text, TextInput, Pressable, ImageBackground, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";

import BackgroundImage from "../img/background-image.png";

export default class Start extends React.Component {
  // The applicatinos main start screen. User can enter name and choose backgroundcolor for the chat screen here. Button to start chat screen is displayed

  // Initialize states for name and background color for passing value to subsequent components
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bgColor: this.colors.pink,
    };
  }
  //Function to set new background color
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  //Palette: https://colorhunt.co/palette/3557645a8f7b81cacfffea11
  colors = {
    darkblue: "#355764",
    darkteal: "#5A8F7B",
    teal: "#81CACF",
    yellow: "#FFEA11"
  };

  render() {
    return (
      <View style={styles.container}>

        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >

          {/* Title box */}
          <View style={styles.titleBox}>
            <Text style={styles.title}>ProChat</Text>
          </View>

          <View style={styles.box1}>
            <View style={styles.inputBox}>
              {/* TODO Check for valid input */}
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder="Tell us your name."
              />
            </View>

            {/* Color Selector title box */}
            <View style={styles.colorBox}>
              <Text style={styles.chooseColor}>
                {" "}
                Pick your background color!{" "}
              </Text>
            </View>

            {/* Color picker */}
            <View style={styles.colorArray}>
              <TouchableOpacity
                accessible={true}
                style={styles.color1}
                onPress={() => this.changeBgColor(this.colors.darkblue)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color2}
                onPress={() => this.changeBgColor(this.colors.darkteal)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color3}
                onPress={() => this.changeBgColor(this.colors.teal)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color4}
                onPress={() => this.changeBgColor(this.colors.yellow)}
              ></TouchableOpacity>
            </View>

            {/* Button to call chat screen */}
            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>

        </ImageBackground>
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="padding" /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleBox: {
    height: "20%",
    width: "88%",
    alignItems: "center",
    paddingTop: 10,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  box1: {
    backgroundColor: "white",
    height: 320,
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputBox: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: "grey",
    width: "88%",
    height: 60,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  colorBox: {
    marginRight: "auto",
    paddingLeft: 15,
    width: "88%",
  },
  chooseColor: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
  },
  colorArray: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  /* Colors for color picker start */
  color1: {
    backgroundColor: "#355764",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color2: {
    backgroundColor: "#5A8F7B",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color3: {
    backgroundColor: "#81CACF",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color4: {
    backgroundColor: "#FFEA11",
    width: 50,
    height: 50,
    borderRadius: 25,
    /* Colors for color picker end */
  },
  button: {
    width: "88%",
    height: 70,
    borderRadius: 8,
    backgroundColor: "#1D6085",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});