import {Subject} from "rxjs"

import sensorPecham     from "./driver/pecham"
import sensorSysgration from "./driver/sysgration"

const dataFl = new Subject()
const dataFr = new Subject()
const dataRl = new Subject()
const dataRr = new Subject()

/**
 * When sensor is a SYSGRATION:
 * -        id start by "8?:EA:CA:?0:"
 * - localName start by "TPMS"
 * -      name start by "TPMS"
 */
const isSysgration = (Device) => /^8[0-3]:EA:CA:[1-4]0:/.test(Device.id)

/**
 *
 */
const getResult = (Device) => isSysgration(Device) ? sensorSysgration.decode(Device) : sensorPecham.decode(Device)

/**
 *
 */
const onAdvertisingFl = (Device) => dataFl.next(getResult(Device))
const onAdvertisingFr = (Device) => dataFr.next(getResult(Device))
const onAdvertisingRl = (Device) => dataRl.next(getResult(Device))
const onAdvertisingRr = (Device) => dataRr.next(getResult(Device))

export default {
  isSysgration,
  onAdvertisingFl,
  onAdvertisingFr,
  onAdvertisingRl,
  onAdvertisingRr,
  dataFl,
  dataFr,
  dataRl,
  dataRr,
}
