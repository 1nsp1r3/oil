import {View, StyleSheet, Text, Modal, Pressable} from "react-native"
import {useState}                                 from "react"
import FontAwesome                                from "@react-native-vector-icons/fontawesome5"
import global                                     from "../global"
import configuration                              from "../configuration"
import ModalConfigurationText                     from "./ModalConfigurationText"
import ModalConfigurationButton                   from "./ModalConfigurationButton"
import ModalDevice                                from "./ModalDevice"

export default ({isVisible, onClose})=>{
  const [             boschId,            setBoschId] = useState("")
  const [                flId,               setFlId] = useState("")
  const [                frId,               setFrId] = useState("")
  const [                rlId,               setRlId] = useState("")
  const [                rrId,               setRrId] = useState("")
  const [      temperatureMax,     setTemperatureMax] = useState(0)
  const [         pressureMin,        setPressureMin] = useState(0)
  const [isModalDeviceVisible, setModalDeviceVisible] = useState(false)
  const [             device,              setDevice] = useState("")

  /**
   *
   */
  const onShow = ()=>{
    configuration.load()
      .then((Options)=>{
        setBoschId(Options.boschId)
        setFlId(Options.flId)
        setFrId(Options.frId)
        setRlId(Options.rlId)
        setRrId(Options.rrId)
        setTemperatureMax(Options.temperatureMax)
        setPressureMin(Options.pressureMin)
      })
  }

  /**
   *
   */
  const onModalClose = ()=>{
    configuration.save({
             boschId: boschId,
                flId: flId,
                frId: frId,
                rlId: rlId,
                rrId: rrId,
      temperatureMax: temperatureMax,
      pressureMin   : pressureMin,
    })
      .then(()=>onClose())
  }

  /**
   *
   */
  const onModalDeviceShow = (Device) => {
    setDevice(Device)
    setModalDeviceVisible(true)
  }

  /**
   *
   */
  const onModalDeviceClose = (Id) => {
    switch(device){
      case "bosch": setBoschId(Id == undefined ? "" : Id); break
      case    "fl":    setFlId(Id == undefined ? "" : Id); break
      case    "fr":    setFrId(Id == undefined ? "" : Id); break
      case    "rl":    setRlId(Id == undefined ? "" : Id); break
      case    "rr":    setRrId(Id == undefined ? "" : Id); break
    }
    setModalDeviceVisible(false)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onShow={onShow}>
      <View style={s.container}>
        <View style={s.titleContainer}>
          <Text style={s.title}>Options</Text>
          <Pressable onPress={onModalClose}>
            <FontAwesome name="times" iconStyle="solid" style={s.buttonClose} />
          </Pressable>
        </View>

        {/* CONTENT */}
        <ModalConfigurationText keyboardType="numeric" icon="thermometer-half" label="Max temperature (°C)" placeholder="120" onChangeText={v => setTemperatureMax(v.replace(",", "."))} value={temperatureMax.toString()} />
        <ModalConfigurationText keyboardType="numeric" icon=         "oil-can" label= "Min pressure (bars)" placeholder="2"   onChangeText={v => setPressureMin(v.replace(",", "."))}    value={pressureMin.toString()}    />

        <ModalConfigurationButton icon="microchip" label="Bosch sensor" buttonLabel={boschId == '' ? 'Select...' : boschId} onPress={()=>onModalDeviceShow("bosch")} />
        <ModalConfigurationButton icon="microchip" label="FL sensor"    buttonLabel={flId == '' ? 'Select...' : flId}       onPress={()=>onModalDeviceShow("fl")} />
        <ModalConfigurationButton icon="microchip" label="FR sensor"    buttonLabel={frId == '' ? 'Select...' : frId}       onPress={()=>onModalDeviceShow("fr")} />
        <ModalConfigurationButton icon="microchip" label="RL sensor"    buttonLabel={rlId == '' ? 'Select...' : rlId}       onPress={()=>onModalDeviceShow("rl")} />
        <ModalConfigurationButton icon="microchip" label="RR sensor"    buttonLabel={rrId == '' ? 'Select...' : rrId}       onPress={()=>onModalDeviceShow("rr")} />
      </View>
      <ModalDevice isVisible={isModalDeviceVisible} onClose={onModalDeviceClose} />
    </Modal>
  )
}

const s = StyleSheet.create({
  container: {
    height: "50%",
    width: "100%",
    backgroundColor: global.colorModal,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "40",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: global.sizeTitle,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: global.colorLowLight,
  },
  title: {
    color: global.colorText,
    fontSize: global.sizeTitle,
  },
  buttonClose: {
    color: global.colorText,
    fontSize: global.sizeIcon,
  },
})
