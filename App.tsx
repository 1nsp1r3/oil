import {StyleSheet, View, PermissionsAndroid} from "react-native"
import {useState, useEffect}                  from "react"
import global                                 from "./global"
import configuration                          from "./app/configuration"
import TextData                               from "./components/TextData"
import Footer                                 from "./components/Footer"
import ModalConfiguration                     from "./components/ModalConfiguration"
import Bluescreen                             from "./components/Bluescreen"
import ble                                    from "./lib/ble"
import bleData                                from "./lib/bleData"
import permission                             from "./lib/permission"

/**
 * MAIN
 */
export default function Index(){
  const [                 temperature, setTemperature]               = useState(0)
  const [                    pressure, setPressure]                  = useState(0)
  const [              temperatureMax, setTemperatureMax]            = useState(0)
  const [                 pressureMin, setPressureMin]               = useState(0)
  const [ isModalConfigurationVisible, setModalConfigurationVisible] = useState(false)
  const [       isConfigurationLoaded, setConfigurationLoaded]       = useState(false)
  const [         isPermissionProblem, setPermissionProblem]         = useState(false)
  const [                isBleProblem, setBleProblem]                = useState(false)

  if (!isConfigurationLoaded) configuration.load()
    .then((Options)=>{
      setTemperatureMax(Options.temperatureMax)
      setPressureMin(Options.pressureMin)
      setConfigurationLoaded(true)
    })

  /**
   *
   */
  const onModalConfigurationClose = function(){
    setConfigurationLoaded(false) //force reload new configuration
    setModalConfigurationVisible(false)
  }

  /**
  *
  */
  const onAdvertising = (Device)=>{
    console.log(Device.name)
    setTemperature(
      bleData.extractTemperature(Device, "00001809-0000-1000-8000-00805f9b34fb")
    )
    setPressure(
      bleData.extractPressure(Device, "00002a6d-0000-1000-8000-00805f9b34fb")
    )
  }

  /**
   *
   */
  const checkPermissions = async ()=>{
    console.log("checkPermissions()")
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

    ble.scan("MX5", null, onAdvertising, ()=>{
      setBleProblem(true)
    })
  }

  /**
   * Run scan only on the first rendering
   */
  useEffect(()=>{
    checkPermissions()
  }, [])

  return(
    <View style={{flex: 1}}>
      <View style={[s.box, s.first, temperature >= temperatureMax ? s.alert : undefined]}>
        <TextData icon="thermometer-half" value={temperature} unit="°C" />
      </View>
      <View style={[s.box, s.second, pressure <= pressureMin ? s.alert : undefined]}>
        <TextData icon="oil-can" value={pressure} unit="bars" />
      </View>
      <Footer onButtonOptionPress={()=>setModalConfigurationVisible(true)} />
      <ModalConfiguration isVisible={isModalConfigurationVisible} onClose={onModalConfigurationClose} />
      <Bluescreen isPermissionProblem={isPermissionProblem} isBleProblem={isBleProblem} />
    </View>
  )
}

const s = StyleSheet.create({
  box: {
    width: '100%',
    justifyContent: "center",
    backgroundColor: global.colorBackground,
  },
  first: {
    flex: 1,
    alignItems: "center",
  },
  second: {
    flex: 1,
    alignItems: "center",
  },
  alert: {
    backgroundColor: global.colorAlert,
  },
})
