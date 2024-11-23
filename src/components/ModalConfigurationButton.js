import {View, StyleSheet, Text, Button} from "react-native"
import FontAwesome                      from "@react-native-vector-icons/fontawesome5"
import global                           from "../global"

export default ({icon, label, buttonLabel, onPress})=>{
  return (
    <View style={s.container}>
      <View style={s.colLabel}>
        <View style={s.labelContainer}>
          <FontAwesome name={icon} iconStyle="solid" style={s.icon} />
          <Text style={s.label}>{label}</Text>
        </View>
      </View>
      <View style={s.colButton}>
        <Button onPress={onPress} title={buttonLabel} />
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  colLabel: {
    flex: 3,
    justifyContent: "center",
  },
  colButton: {
    flex: 2,
    padding: 2,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: global.sizeText,
  },
  icon: {
    color: global.colorText,
    fontSize: global.sizeText,
    marginLeft: global.sizeText,
  },
  label: {
    color: global.colorText,
    fontSize: global.sizeText,
    marginLeft: global.sizeText,
  },
})
