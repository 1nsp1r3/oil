import {View, StyleSheet, Text, Modal} from "react-native"
import global                          from "../global"

export default ({isPermissionProblem, isBleProblem})=>{
  return (
    <Modal animationType="slide" visible={isPermissionProblem||isBleProblem}>
      <View style={s.container}>
        <Text style={s.content}>A problem has been detected and the application has been shut down to prevent damage to your phone.</Text>
        <Text style={isPermissionProblem ? s.content : s.hidden}>Location and bluetooth permissions are required for this application.</Text>
        <Text style={isBleProblem        ? s.content : s.hidden}>Location and bluetooth must be enabled for this application.</Text>
        <Text style={s.content}>Technical Information:</Text>
        <Text style={s.content}>*** win32k.sys - Address 0x820e7275 base at 0x820de000 DateStamp 0x4dba2670</Text>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000082",
    position: "absolute",
    bottom: 0,
  },
  content: {
    fontFamily: "monospace",
    color: "#FFFFFF",
    fontSize: global.sizeText,
    padding: global.sizeText,
  },
  hidden: {
    display: "none",
  }
})
