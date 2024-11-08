import {View, StyleSheet, Text, Modal, Pressable} from "react-native"
import {useState}                                 from "react"
import FontAwesome                                from "@react-native-vector-icons/fontawesome5"
import global                                     from "../global"
import ModalConfigurationOption                   from "../components/ModalConfigurationOption"
import configuration                              from "../app/configuration"

export default ({isVisible, onClose})=>{
  const [temperatureMax, setTemperatureMax] = useState(0)
  const [pressureMin, setPressureMin]       = useState(0)

  /**
   *
   */
  const onShow = ()=>{
    configuration.load()
      .then((Options)=>{
        setTemperatureMax(Options.temperatureMax)
        setPressureMin(Options.pressureMin)
      })
  }

  /**
   *
   */
  const onModalClose = ()=>{
    configuration.save({
      "temperatureMax": temperatureMax,
      "pressureMin": pressureMin,
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
        <ModalConfigurationOption icon="thermometer-half" text="Max temperature (°C)" placeholder="120" onChangeText={v => setTemperatureMax(v.replace(",", "."))} value={temperatureMax.toString()} />
        <ModalConfigurationOption icon=         "oil-can" text= "Min pressure (bars)" placeholder=  "2" onChangeText={v => setPressureMin(v.replace(",", "."))}    value={pressureMin.toString()}    />
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
