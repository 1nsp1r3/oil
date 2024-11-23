import {StyleSheet, ImageBackground, Text} from "react-native"
import global                              from "../../global"
import f                                   from "../../lib/format"

export default ({
  property,
  data,
}) => {
  /**
   *
   */
  const getValue = () => {
    switch(property){
      case "pressure"      : return f.toOneDecimal(data[property])
      case "temperature"   : return `${data[property]}°C`
      case "batteryPercent": return `${data[property]}`
      case "lastReception" : return `${f.numberOfSecondsSince(data[property])}s`
    }
  }

  return (
    <ImageBackground style={s.tireIcon} source={require("../../../assets/iso7000-1435-tyre-pressure.png")}>
      <Text style={s.text}>{getValue()}</Text>
    </ImageBackground>
  )
}

const s = StyleSheet.create({
  tireIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
  },
  text:{
    color: global.colorText,
    fontSize: 20,
  },
})
