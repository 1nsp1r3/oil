/**
 * Generic lib to read GAP data
 */
import {BleManager, State} from "react-native-ble-plx"
import {Subject}           from "rxjs"
import bleData             from "./bleData"

let   manager          = null
let   lastReception    = 0
const boschDataSubject = new Subject()

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
const getLastReception = ()=>{
  return lastReception
}

/**
 *
 */
const startDeviceScan = (Manager, Name, PeripheralId, OnError)=>{
  Manager.startDeviceScan(null, null, (error, device)=>{
    if (error){
      OnError()
      console.error("[ERROR]", error)
      return
    }
    if (device.localName != Name) return
    if ((PeripheralId != "") && (device.id != PeripheralId)) return
    onBoschAdvertising(device)
    lastReception = new Date().getTime()
  })
}

/**
 * gapScan("MX5", "", ()={})
 * gapScan("MX5", "ED:BF:70:51:36:C7", ()={})
 */
const gapScan = async function(Name, PeripheralId, OnError){
  const state = await getManager().state()
  if (state != State.PoweredOn){
    console.error(`Start BLE manager... KO (State: ${state})`)
    OnError()
    return
  }
  console.log("Start BLE manager... OK")

  manager.stopDeviceScan()
    .then(()=>{
      lastReception = new Date().getTime()
      startDeviceScan(manager, Name, PeripheralId, OnError)
    })
    .catch(()=>{
      console.error("stopDeviceScan... KO")
    })
}

/**
*
*/
const onBoschAdvertising = (Device)=>{
  boschDataSubject.next({
    temperature: bleData.extractTemperature(Device, "00001809-0000-1000-8000-00805f9b34fb"),
    pressure: bleData.extractPressure(Device, "00002a6d-0000-1000-8000-00805f9b34fb"),
  })
}

export default {
  gapScan,
  getLastReception,
  boschDataSubject,
}
