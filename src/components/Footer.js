import {View, StyleSheet, Pressable, Text} from "react-native"
import FontAwesome                         from "@react-native-vector-icons/fontawesome5"
import global                              from "../global"

export default ({
  style,
  counter,
  onButtonOptionPress,
}) => {
  const isDelayed = () => counter > 60
  const getCounter = () => isDelayed() ? "∞s" : `${counter}s`

  return (
    <View style={[s.container, style]}>
      <View style={s.col}></View>
      <View style={[s.col, s.colText]}>
        <Text style={[s.text, isDelayed() ? s.through : undefined]}>{getCounter()}</Text>
      </View>
      <View style={[s.col, s.colIcon]}>
        <Pressable onPress={onButtonOptionPress}>
          <FontAwesome name="cog" iconStyle="solid" style={s.icon} />
        </Pressable>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: global.colorBackground,
    paddingHorizontal: global.sizeIcon,
  },
  colText: {
    alignItems: "center",
  },
  colIcon: {
    alignItems: "flex-end",
  },
  text: {
    color: global.colorLowLight,
  },
  icon: {
    color: global.colorText,
    fontSize: global.sizeIcon,
  },
  through:{
    textDecorationLine: "line-through",
    color: global.colorAlert,
  },
})
