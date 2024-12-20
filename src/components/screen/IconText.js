import {StyleSheet, View, Image, Text} from "react-native"
import global                          from "../../global"

export default ({
  value,
  legend,
  isDelayed,
  image,
}) => (
  <View style={s.container}>
    <Image style={s.icon} source={image} />
    <View style={s.text}>
      <Text style={[s.value, isDelayed ? s.through : undefined]}>{value}</Text>
      {(value.length > 0) && <Text style={s.legend}>{legend}</Text>}
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
    tintColor: global.colorOil,
  },
  value: {
    fontSize: 80,
    color: global.colorOil,
  },
  legend: {
    marginLeft: 5,
    fontSize: 40,
    color: global.colorOil,
    fontStyle: "italic",
  },
  through:{
    textDecorationLine: "line-through",
    color: global.colorAlert,
  },
})
