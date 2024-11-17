import {StyleSheet, View, Image, Text} from "react-native"
import {useState, useEffect}           from "react"
import global                          from "../global"
import IconText                        from "./IconText"

export default ({
  style,
  temperatureMax,
  pressureMin,
  dataStream,
}) => {
  const [temperature, setTemperature] = useState(0)
  const [   pressure,    setPressure] = useState(0)

  useEffect(()=>{
    console.log("[ScreenB] First rendering")

    dataStream.subscribe(Data=>{
      setTemperature(Data.temperature)
      setPressure(Data.pressure)
    })
  }, [])

  /**
   * Convert 4 to "4.0"
   */
  const getPressure = (Pressure) => Intl.NumberFormat("en-GB", { minimumFractionDigits: 1 }).format(Pressure)

  return (
    <View style={style}>
      <View style={[s.box, temperature >= temperatureMax ? s.alert : undefined]}>
        <IconText color={global.colorOil} value={temperature} legend="°C" image={require("../../assets/iso7000-2426-engine-oil-temperature.png")}></IconText>
      </View>
      <View style={[s.box, pressure <= pressureMin ? s.alert : undefined]}>
        <IconText color={global.colorOil} value={getPressure(pressure)} legend="bars" image={require("../../assets/iso7000-0248-engine-oil.png")}></IconText>
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
