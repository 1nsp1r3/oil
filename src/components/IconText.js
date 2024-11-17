import {StyleSheet, View, Image, Text} from "react-native"

export default ({
  color,
  value,
  legend,
  image,
}) => (
  <View style={s.container}>
    <Image style={s.icon} source={image} tintColor={color} />
    <View style={s.text}>
      <Text style={[s.value, {color: color}]}>{value}</Text>
      <Text style={[s.legend, {color: color}]}>{legend}</Text>
    </View>
  </View>
)

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
  value: {
    fontSize: 80,
  },
  legend: {
    marginLeft: 5,
    fontSize: 40,
    fontStyle: "italic",
  },
})
