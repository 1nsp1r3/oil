import {View, StyleSheet, Pressable} from "react-native"
import FontAwesome                   from "@react-native-vector-icons/fontawesome5"
import global                        from "../global"

export default ({onButtonOptionPress})=>{
  return (
    <View style={s.container}>
      <Pressable onPress={onButtonOptionPress}>
        <FontAwesome name="cog" iconStyle="solid" style={s.icon} />
      </Pressable>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 50,
    backgroundColor: global.colorBackground,
    paddingHorizontal: global.sizeIcon,
  },
  icon: {
    color: global.colorText,
    fontSize: global.sizeIcon,
  },
})
