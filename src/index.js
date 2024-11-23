import {StyleSheet, View, PermissionsAndroid} from "react-native"
import {useState, useEffect}                  from "react"

import configuration                          from "./configuration"
import Screen                                 from "./components/screen/Screen"
import Footer                                 from "./components/Footer"
import ModalConfiguration                     from "./components/ModalConfiguration"
import Bluescreen                             from "./components/Bluescreen"
import ble                                    from "./lib/ble"
import permission                             from "./lib/permission"
import sensorBosch                            from "./sensor/bosch"
import sensorTpms                             from "./sensor/tpms"
import f                                      from "./lib/format"

/**
 * MAIN
 */
export default function Index(){
  const [           counter, setCounter]                             = useState(0)
  const [ isModalConfigurationVisible, setModalConfigurationVisible] = useState(false)
  const [         isPermissionProblem, setPermissionProblem]         = useState(false)
  const [                isBleProblem, setBleProblem]                = useState(false)

  //Configuration
  const [temperatureMax, setTemperatureMax] = useState(0)
  const [   pressureMin, setPressureMin]    = useState(0)

  /**
   *
   */
  const runScan = async (Options)=>{
    console.log(`runScan()`)
    const granted = await permission.request([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, //Normalement inutile (Absent du AndroidManifest.xml) mais obligatoire quand on passe par PermissionsAndroid.requestMultiple pour activer les permissions
    ])
    if (!granted){
      setPermissionProblem(true)
      return
    }

    const bleConfig = [
      {
        id: Options.boschId,
        onAdvertising: sensorBosch.onAdvertising,
      },
      {
        id: Options.flId,
        onAdvertising: sensorTpms.onAdvertisingFl,
      },
      {
        id: Options.frId,
        onAdvertising: sensorTpms.onAdvertisingFr,
      },
      {
        id: Options.rlId,
        onAdvertising: sensorTpms.onAdvertisingRl,
      },
      {
        id: Options.rrId,
        onAdvertising: sensorTpms.onAdvertisingRr,
      },
    ]

    /**
     * When GAP scan starting
     * ble.boschDataSubject is feed with GAP data
     */
    ble.gapScan(bleConfig, ()=>{
      setBleProblem(true)
    })
  }

  /**
   *
   */
  const loadConfiguration = ()=>{
    console.log("loadConfiguration()")
    configuration.load()
      .then((Options)=>{
        setTemperatureMax(Options.temperatureMax)
        setPressureMin(Options.pressureMin)

        runScan(Options) //start BLE
      })
  }

  /**
   *
   */
  const onModalConfigurationClose = function(){
    loadConfiguration()
    setModalConfigurationVisible(false)
  }

  /**
   * Load configuration only on the first rendering
   */
  useEffect(()=>{
    loadConfiguration()

    setInterval(()=>{
      setCounter(f.numberOfSecondsSince(sensorBosch.getLastReception()))
    }, 1000)
  }, [])

  return(
    <View style={s.container}>
      <Screen style={s.screen}
        temperatureMax={temperatureMax}
        pressureMin={pressureMin}
        boschDataStream={sensorBosch.data}
        flDataStream={sensorTpms.dataFl}
        frDataStream={sensorTpms.dataFr}
        rlDataStream={sensorTpms.dataRl}
        rrDataStream={sensorTpms.dataRr}
      />
      <Footer style={s.footer} counter={counter} onButtonOptionPress={()=>setModalConfigurationVisible(true)} />
      <ModalConfiguration isVisible={isModalConfigurationVisible} onClose={onModalConfigurationClose} />
      <Bluescreen isPermissionProblem={isPermissionProblem} isBleProblem={isBleProblem} />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1, //height: "100%"
  },
  screen: {
    flex: 9,
  },
  footer: {
    flex: 1,
  },
})
