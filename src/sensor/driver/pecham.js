import bleData from "../../lib/bleData"
import battery from "../../lib/battery"
import f       from "../../lib/format"

/**
 *
 */
const decode = function(Device){
  const base64Value = Device.manufacturerData
  let data = bleData.fromBase64toUint8Array(base64Value) //[40, 29, 19, 1, 5, 163, 118]
                                                         //[28  1D  13 01 05   A3   76]
  const batteryVoltage = data[1]/10  //1D   ->  29 -> 2.9V
  const temperature    = data[2]     //13   ->  19 -> 19°C
  const pressure       = bleData.fromUint8ArrayToShort(
    data.slice(3, 5), //0x0105
                   0, //littleEndian=true to swap 2 bytes
  ) / 100             //0x0105 -> 261 kpa -> 2.61 bars

  return {
    pressure: f.toOneDecimal(pressure),
    temperature: `${temperature}°C`,
    batteryPercent: `${battery.getPercent(batteryVoltage)}%`,
    lastReception: new Date().getTime(),
  }
}

export default {
  decode,
}
