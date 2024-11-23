import {StyleSheet, View}    from "react-native"
import {useState, useEffect} from "react"
import global                from "../../global"
import f                     from "../../lib/format"
import IconText              from "./IconText"

export default ({
  style,
  temperatureMax,
  pressureMin,
  dataStream,
}) => {
  const [temperature, setTemperature] = useState(0)
  const [pressure, setPressure]       = useState(0)

  useEffect(()=>{
    console.log("[PressureGauges] First rendering")

    if (dataStream) dataStream.subscribe(Data=>{
      setTemperature(Data.temperature)
      setPressure(Data.pressure)
    })
  }, [])

  return (
    <View style={style}>
      <View style={[s.box, temperature >= temperatureMax ? s.alert : undefined]}>
        <IconText value={temperature} legend="°C" image={require("../../../assets/iso7000-2426-engine-oil-temperature.png")}></IconText>
      </View>
      <View style={[s.box, pressure <= pressureMin ? s.alert : undefined]}>
        <IconText value={f.toOneDecimal(pressure)} legend="bars" image={require("../../../assets/iso7000-0248-engine-oil.png")}></IconText>
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
