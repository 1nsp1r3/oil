import {View, StyleSheet, Text, Pressable} from "react-native"
import FontAwesome                         from "@react-native-vector-icons/fontawesome5"
import global                              from "../global"

export default ({id, label, onPress}) => {
  return (
    <Pressable onPress={() => onPress(id)}>
      <View style={s.container}>
        <FontAwesome name="microchip" iconStyle="solid" style={s.icon} />
        <Text style={s.text}>{label} ({id})</Text>
      </View>
    </Pressable>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  icon: {
    color: global.colorText,
    fontSize: global.sizeText,
  },
  text: {
    marginLeft: global.sizeText,
    color: global.colorText,
    fontSize: global.sizeText,
  },
})
