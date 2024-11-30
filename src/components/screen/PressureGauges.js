import {StyleSheet, View}    from "react-native"
import {useState, useEffect} from "react"
import global                from "../../global"
import f                     from "../../lib/format"
import IconText              from "./IconText"

export default ({
  style,
  temperatureMax,
  pressureMin,
  data,
}) => {
  const isDelayed = () => f.numberOfSecondsSince(data["lastReception"]) > 60

  return (
    <View style={style}>
      <View style={[s.box, data["temperature"] >= temperatureMax ? s.alert : undefined]}>
        <IconText value={data["temperature"].toString()} legend="°C" isDelayed={isDelayed()} image={require("../../../assets/iso7000-2426-engine-oil-temperature.png")}></IconText>
      </View>
      <View style={[s.box, data["pressure"] <= pressureMin ? s.alert : undefined]}>
        <IconText value={data["pressure"]} legend="bars" isDelayed={isDelayed()} image={require("../../../assets/iso7000-0248-engine-oil.png")}></IconText>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: global.colorBackground,
  },
  alert: {
    backgroundColor: global.colorAlert,
  },
})
