import {StyleSheet, View, Pressable} from "react-native"
import {useState, useEffect}         from "react"
import global                        from "../../global"
import PressureGauges                from "./PressureGauges"
import Tire                          from "./Tire"

export default ({
  style,
  temperatureMax,
  pressureMin,
  boschDataStream,
  flDataStream,
  frDataStream,
  rlDataStream,
  rrDataStream,
}) => {
  //Tires
  const [fl, setFl] = useState({pressure: 0, temperature: 0, batteryPercent: "0%", lastReception: new Date().getTime()})
  const [fr, setFr] = useState({pressure: 0, temperature: 0, batteryPercent: "0%", lastReception: new Date().getTime()})
  const [rl, setRl] = useState({pressure: 0, temperature: 0, batteryPercent: "0%", lastReception: new Date().getTime()})
  const [rr, setRr] = useState({pressure: 0, temperature: 0, batteryPercent: "0%", lastReception: new Date().getTime()})
  const [tiresDisplay, setTiresDisplay] = useState(0)

  /**
   * 0..1..2..3..4..0..1..
   */
  const switchTiresDisplay = () => setTiresDisplay((tiresDisplay+1) % 4)

  /**
   *
   */
  const getTireProperty = () => {
    switch(tiresDisplay){
      case 0: return "pressure"
      case 1: return "temperature"
      case 2: return "batteryPercent"
      case 3: return "lastReception"
    }
  }

  useEffect(()=>{
    console.log("[Screen] First rendering")
    if (flDataStream) flDataStream.subscribe(Data => setFl(Data))
    if (frDataStream) frDataStream.subscribe(Data => setFr(Data))
    if (rlDataStream) rlDataStream.subscribe(Data => setRl(Data))
    if (rrDataStream) rrDataStream.subscribe(Data => setRr(Data))
  }, [])

  return (
    <View style={[style, s.hdir]}>
      {/* LEFT COLUMN */}
      <View style={s.left}>
        <View style={s.top}>
          <Pressable onPress={switchTiresDisplay}>
            <Tire property={getTireProperty()} data={fl} />
          </Pressable>
        </View>
        <View style={s.bottom}>
          <Pressable onPress={switchTiresDisplay}>
            <Tire property={getTireProperty()} data={rl} />
          </Pressable>
        </View>
      </View>

      {/* PRESSURE GAUGES */}
      <View style={s.middle}>
         <PressureGauges style={s.pressureGauges} temperatureMax={temperatureMax} pressureMin={pressureMin} dataStream={boschDataStream} />
      </View>

      {/* RIGHT COLUMN */}
      <View style={s.right}>
        <View style={s.top}>
          <Pressable onPress={switchTiresDisplay}>
            <Tire property={getTireProperty()} data={fr} />
          </Pressable>
        </View>
        <View style={s.bottom}>
          <Pressable onPress={switchTiresDisplay}>
            <Tire property={getTireProperty()} data={rr} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  hdir: {
    flexDirection: "row",
  },
  left: {
    flex: 1,
  },
  middle: {
    flex: 3,
  },
  right: {
    flex: 1,
  },
  top: {
    flex: 1,
    borderWidth: 1,
    borderColor: global.colorSeparator,
    backgroundColor: global.colorBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    flex: 1,
    borderWidth: 1,
    borderColor: global.colorSeparator,
    backgroundColor: global.colorBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  pressureGauges: {
    flex: 1, //= height: "100%"
  },
})
