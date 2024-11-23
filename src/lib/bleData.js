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
const fromUint8ArrayToShort = (UnsignedInt8Array, LittleEndian)=>{
  const dataView = new DataView(UnsignedInt8Array.buffer, 0)
  return dataView.getInt16(0, LittleEndian)
}

/**
 *
 */
const fromUint8ArrayToInt = (UnsignedInt8Array, LittleEndian)=>{
  const dataView = new DataView(UnsignedInt8Array.buffer, 0)
  return dataView.getInt32(0, LittleEndian)
}

/**
 *
 */
const bleGapShortValue = (Device, Uuid)=>{
  const base64Value = Device.serviceData[Uuid]

  return fromUint8ArrayToShort(
    fromBase64toUint8Array(base64Value), 1 //littleEndian=true to swap 2 bytes
  )
}

export default {
  fromBase64toUint8Array,
  fromUint8ArrayToShort,
  fromUint8ArrayToInt,
  bleGapShortValue,
}
