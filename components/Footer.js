import {View, StyleSheet, Pressable, Text} from "react-native"
import FontAwesome                         from "@react-native-vector-icons/fontawesome5"
import global                              from "../global"

export default ({counter, onButtonOptionPress})=>{
  return (
    <View style={s.container}>
      <View style={s.colText}>
        <Text style={s.text}>{counter}</Text>
      </View>
      <View style={s.colIcon}>
        <Pressable onPress={onButtonOptionPress}>
          <FontAwesome name="cog" iconStyle="solid" style={s.icon} />
        </Pressable>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    height: 30,
  },
  colText: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: global.colorBackground,
    paddingHorizontal: global.sizeIcon,
  },
  text: {
    color: global.colorLowLight,
  },
  colIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: global.colorBackground,
    paddingHorizontal: global.sizeIcon,
  },
  icon: {
    color: global.colorText,
    fontSize: global.sizeIcon,
  },
})
