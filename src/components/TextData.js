import {View, StyleSheet, Text} from "react-native"
import FontAwesome              from "@react-native-vector-icons/fontawesome5"
import global                   from "../global"

export default ({
  icon,
  value,
  unit,
}) => {
  return (
    <View style={s.container}>
      <FontAwesome name={icon} iconStyle="solid" style={s.icon} />
      <Text style={s.text}>{value} {unit}</Text>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  icon: {
    color: global.colorText,
    fontSize: 60,
  },
  text: {
    color: global.colorText,
    marginLeft: 20,
    fontSize: 60,
  },
})
