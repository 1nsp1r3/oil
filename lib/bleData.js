/**
 * Generic lib to read GAP data
 */

/**
 *
 */
const fromBase64toUint8Array = (Base64)=>{
  const binString = atob(Base64)
  return Uint8Array.from(binString, (m)=>m.codePointAt(0))
}

/**
 *
 */
const fromUint8ArrayToShort = (UnsignedInt8Array)=>{
  const dataView = new DataView(UnsignedInt8Array.buffer, 0)
  return dataView.getInt16(0, 1) //littleEndian=true to swap 2 bytes
}

/**
 *
 */
const bleGapShortValue = (Device, Uuid)=>{
  const base64Value = Device.serviceData[Uuid]

  return fromUint8ArrayToShort(
    fromBase64toUint8Array(base64Value)
  )
}

const psiToBar = (psiValue) => psiValue /  14.504

/**
 *
 */
const extractTemperature = function(Device, Uuid){
  const temperature = bleGapShortValue(Device, Uuid) / 100 //7599 -> 75.99 °C
  return Math.round(temperature)                           //75.99 °C -> 76 °C
}

/**
 *
 */
const extractPressure = function(Device, Uuid){
  const psiPressure = bleGapShortValue(Device, Uuid) / 100 //7599 -> 75.99 psi
  const barPressure = psiToBar(psiPressure)                //75.99 psi -> 5.239 bars
  return Math.round(barPressure*10)/10                     //5.239 bars -> 5.2 bars
}

export default {
  psiToBar,
  extractTemperature,
  extractPressure,
}
