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
    const seconds = f.numberOfSecondsSince(data["lastReception"])
    switch(property){
      case "pressure"      : return data[property]
      case "temperature"   : return data[property]
      case "batteryPercent": return data[property]
      case "lastReception" : return seconds > 60 ? "∞s" : `${seconds}s`
    }
  }

  const isDelayed = () => f.numberOfSecondsSince(data["lastReception"]) > 60

  return (
    <ImageBackground style={s.tireIcon} source={require("../../../assets/iso7000-1435-tyre-pressure.png")}>
      <Text style={[s.text, isDelayed() ? s.through : undefined]}>{getValue()}</Text>
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
  through:{
    textDecorationLine: "line-through",
    color: global.colorAlert,
  },
})
