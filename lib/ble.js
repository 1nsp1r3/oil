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
 *
 */
const startDeviceScan = (Manager, Name, PeripheralId, OnAdvertising, OnError)=>{
  Manager.startDeviceScan(null, null, (error, device)=>{
    if (error){
      OnError()
      console.error("[ERROR]", error)
      return
    }
    if (device.localName != Name) return
    if ((PeripheralId != "") && (device.id != PeripheralId)) return
    OnAdvertising(device)
  })
}

/**
 * scan("MX5", "", ()={}, ()={})
 * scan("MX5", "ED:BF:70:51:36:C7", ()={}, ()={})
 */
const scan = async function(Name, PeripheralId, OnAdvertising, OnError){
  const state = await getManager().state()
  if (state != State.PoweredOn){
    console.error(`Start BLE manager... KO (State: ${state})`)
    OnError()
    return
  }
  console.log("Start BLE manager... OK")

  manager.stopDeviceScan()
    .then(()=>{
      startDeviceScan(manager, Name, PeripheralId, OnAdvertising, OnError)
    })
    .catch(()=>{
      console.error("stopDeviceScan... KO")
    })
}

export default {
  scan,
}
