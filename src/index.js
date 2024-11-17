import {StyleSheet, View, PermissionsAndroid} from "react-native"
import {useState, useEffect}                  from "react"

import configuration                          from "./configuration"
import ScreenB                                from "./components/ScreenB"
import Footer                                 from "./components/Footer"
import ModalConfiguration                     from "./components/ModalConfiguration"
import Bluescreen                             from "./components/Bluescreen"
import ble                                    from "./lib/ble"
import permission                             from "./lib/permission"

/**
 * MAIN
 */
export default function Index(){
  const [                     counter, setCounter]                   = useState(0)
  const [ isModalConfigurationVisible, setModalConfigurationVisible] = useState(false)
  const [         isPermissionProblem, setPermissionProblem]         = useState(false)
  const [                isBleProblem, setBleProblem]                = useState(false)

  //Configuration
  const [temperatureMax, setTemperatureMax] = useState(0)
  const [   pressureMin, setPressureMin]    = useState(0)

  /**
   *
   */
  const runScan = async (PeripheralId)=>{
    console.log(`runScan(${PeripheralId})`)
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

    /**
     * When GAP scan starting
     * ble.boschDataSubject is feed with GAP data
     */
    ble.gapScan("MX5", PeripheralId, ()=>{
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

        //Then start BLE
        runScan(Options.peripheralId)
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
      const now = new Date().getTime()
      const diff = now - ble.getLastReception()
      setCounter(Math.round(diff/1000))
    }, 1000)
  }, [])

  return(
    <View style={s.container}>
      <ScreenB style={s.screen} temperatureMax={temperatureMax} pressureMin={pressureMin} dataStream={ble.boschDataSubject} />
      <Footer  style={s.footer} counter={counter} onButtonOptionPress={()=>setModalConfigurationVisible(true)} />
      <ModalConfiguration                  isVisible={isModalConfigurationVisible} onClose={onModalConfigurationClose} />
      <Bluescreen                          isPermissionProblem={isPermissionProblem} isBleProblem={isBleProblem} />
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
