import bleData from "../../lib/bleData"
import f       from "../../lib/format"

/**
 *
 */
const decode = function(Device){
  const base64Value = Device.manufacturerData
  let data = bleData.fromBase64toUint8Array(base64Value)

  const kpa = bleData.fromUint8ArrayToInt(
    data.slice(8, 12), //E8030000
                    1, //littleEndian=true to swap 2 bytes
  ) / 1000             //03E8 -> 1000 -> 1 kpa (0.01 bars)

  const temperature = bleData.fromUint8ArrayToInt(
    data.slice(12, 16), //C0060000
                     1, //littleEndian=true to swap 2 bytes
  ) / 100               //06C0 -> 1728 -> 17.28 °C

  return {
    pressure: f.toOneDecimal(kpa / 100), //28.131 kpa -> 0.28 -> 0.3 bars,
    temperature: `${Math.round(temperature)}°C`,
    batteryPercent: `${data[16]}%`,
    lastReception: new Date().getTime(),
  }
}

export default {
  decode,
}
