import {View, StyleSheet, Text, Modal, Pressable, FlatList} from "react-native"
import {useState}                                           from "react"
import FontAwesome                                          from "@react-native-vector-icons/fontawesome5"
import global                                               from "../global"
import ModalDeviceItem                                      from "./ModalDeviceItem"
import ble                                                  from "../lib/ble"

export default ({isVisible, onClose})=>{
  const [devices, setDevices] = useState([])

  /**
   *
   */
  const onShow = () => {
    const tmp = []
    for(const key in ble.devices){
      tmp.push({
          id: key,
        name: ble.devices[key],
      })
    }
    setDevices(tmp)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onShow={onShow}>
      <View style={s.container}>
        <View style={s.titleContainer}>
          <Text style={s.title}>Nearest devices</Text>
          <Pressable onPress={() => onClose()}>
            <FontAwesome name="times" iconStyle="solid" style={s.buttonClose} />
          </Pressable>
        </View>

        {/* CONTENT */}
        <FlatList style={s.flatList}
          data={devices}
          renderItem={({item}) => <ModalDeviceItem id={item.id} label={item.name} onPress={(id) => onClose(id)} />}
          keyExtractor={e => e.id}
        />
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  container: {
    height: "80%",
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
  flatList: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
})
