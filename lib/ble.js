/**
 * Generic lib to read GAP data
 */
import {BleManager, State} from "react-native-ble-plx"

let manager = null

/**
 *
 */
const getManager = function(){
  if (manager == null){
    console.log("Start BLE manager...")
    manager = new BleManager() //1 seule instance autorisée, attention à ne pas recréer à chaque render
  }
  return manager
}

/**
 * scan("MX5", null, ()={})
 * scan("MX5", ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"], ()={})
 */
const scan = async function(Name, Uuid, OnAdvertising, OnError){
  const state = await getManager().state()
  if (state != State.PoweredOn){
    console.error(`Start BLE manager... KO (State: ${state})`)
    OnError()
    return
  }
  console.log("Start BLE manager... OK")

  manager.startDeviceScan(Uuid, null, (error, device)=>{
    if (error){
      OnError()
      console.error("[ERROR]", error)
      return
    }
    if (device.localName == Name){
      OnAdvertising(device)
    }
  })
}

export default {
  scan,
}
