import {View, StyleSheet, Text, TextInput} from "react-native"
import FontAwesome                         from "@react-native-vector-icons/fontawesome5"
import global                              from "../global"

export default ({keyboardType, icon, label, placeholder, onChangeText, value})=>{
  return (
    <View style={s.container}>
      <View style={s.colLabel}>
        <View style={s.labelContainer}>
          <FontAwesome name={icon} iconStyle="solid" style={s.icon} />
          <Text style={s.label}>{label}</Text>
        </View>
      </View>
      <View style={s.colInput}>
        <TextInput keyboardType={keyboardType} style={s.textInput} placeholder={placeholder} onChangeText={onChangeText} value={value} />
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
  colInput: {
    flex: 2,
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
  textInput: {
    borderWidth: 1,
    color: global.colorText,
    borderColor: global.colorLowLight,
    margin: 1,
    paddingLeft: global.sizeText,
    height: global.sizeInput,
  },
})
