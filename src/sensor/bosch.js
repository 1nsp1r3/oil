import {Subject} from "rxjs"
import bleData   from "../lib/bleData"

const data          = new Subject()
let   lastReception = new Date().getTime()

/**
*
*/
const getLastReception = () => lastReception

const psiToBar = (psiValue) => psiValue /  14.504

/**
 *
 */
const extractTemperature = function(Device){
  const temperature = bleData.bleGapShortValue(Device, "00001809-0000-1000-8000-00805f9b34fb") / 100 //7599 -> 75.99 °C
  return Math.round(temperature)                           //75.99 °C -> 76 °C
}

/**
 *
 */
const extractPressure = function(Device){
  const psiPressure = bleData.bleGapShortValue(Device, "00002a6d-0000-1000-8000-00805f9b34fb") / 100 //7599 -> 75.99 psi
  const barPressure = psiToBar(psiPressure)                //75.99 psi -> 5.239 bars
  return Math.round(barPressure*10)/10                     //5.239 bars -> 5.2 bars
}

/**
*
*/
const onAdvertising = (Device) => {
  lastReception = new Date().getTime()

  data.next({
    temperature: extractTemperature(Device),
    pressure: extractPressure(Device),
  })
}

export default {
  onAdvertising,
  data,
  getLastReception,
}
