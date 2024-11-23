/**
 * Generic lib to read GAP data
 */
import {BleManager, State} from "react-native-ble-plx"

let manager = null
let devices = {}

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
const startDeviceScan = (Manager, BleConfig, OnError)=>{
  Manager.startDeviceScan(null, null, (error, device)=>{
    if (error){
      OnError()
      console.error("[ERROR]", error)
      return
    }

    for(const config of BleConfig){
      devices[device.id] = device.localName //Populate the list of discovered devices

      if (device.id == config.id) config.onAdvertising(device)
    }
  })
}

/**
 *
 */
const gapScan = async function(BleConfig, OnError){
  const state = await getManager().state()
  if (state != State.PoweredOn){
    console.error(`Start BLE manager... KO (State: ${state})`)
    OnError()
    return
  }
  console.log("Start BLE manager... OK")

  manager.stopDeviceScan()
    .then(()=>{
      startDeviceScan(manager, BleConfig, OnError)
    })
    .catch(()=>{
      console.error("stopDeviceScan... KO")
    })
}

export default {
  gapScan,
  devices,
}
