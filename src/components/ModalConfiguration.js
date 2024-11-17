import {View, StyleSheet, Text, Modal, Pressable} from "react-native"
import {useState}                                 from "react"
import FontAwesome                                from "@react-native-vector-icons/fontawesome5"
import global                                     from "../global"
import configuration                              from "../configuration"
import ModalConfigurationOption                   from "./ModalConfigurationOption"

export default ({isVisible, onClose})=>{
  const [peripheralId, setPeripheralId]     = useState("")
  const [temperatureMax, setTemperatureMax] = useState(0)
  const [pressureMin, setPressureMin]       = useState(0)

  /**
   *
   */
  const onShow = ()=>{
    configuration.load()
      .then((Options)=>{
        setPeripheralId(Options.peripheralId)
        setTemperatureMax(Options.temperatureMax)
        setPressureMin(Options.pressureMin)
      })
  }

  /**
   *
   */
  const onModalClose = ()=>{
    configuration.save({
        "peripheralId": peripheralId,
      "temperatureMax": temperatureMax,
      "pressureMin"   : pressureMin,
    })
      .then(()=>onClose())
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
        <ModalConfigurationOption keyboardType="default" icon=       "microchip" text="Peripheral ID"        placeholder="ED:BF:70:51:36:C7" onChangeText={v => setPeripheralId(v)} value={peripheralId} />
        <ModalConfigurationOption keyboardType="numeric" icon="thermometer-half" text="Max temperature (°C)" placeholder="120"               onChangeText={v => setTemperatureMax(v.replace(",", "."))} value={temperatureMax.toString()} />
        <ModalConfigurationOption keyboardType="numeric" icon=         "oil-can" text= "Min pressure (bars)" placeholder="2"                 onChangeText={v => setPressureMin(v.replace(",", "."))}    value={pressureMin.toString()}    />
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  container: {
    height: "25%",
    width: "100%",
    backgroundColor: global.colorModal,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "20%",
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