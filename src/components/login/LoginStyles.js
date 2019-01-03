const React = require("react-native");

const { Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;

export default {
  viewImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: deviceWidth
  }
};
