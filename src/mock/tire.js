import {Subject, interval} from "rxjs"

const data = new Subject()

const tire    = [1.8, 1.8, 2.2, 2.2]
const tireDir = [true, true, true, true]

/**
 *
 */
const getNextTemperature = (Index) => {
  tireDir[Index] ? tire[Index]+=.1 : tire[Index]-=.1
  if (tire[Index] > 2.3) tireDir[Index]=false
  if (tire[Index] < 1.6) tireDir[Index]=true
  return tire[Index]
}

/**
 *
 */
const start = () => {
  console.log("tire.start()")
  interval(1000)
    .subscribe(v => {
      data.next({
        fl: {
          pressure: getNextTemperature(0),
          temperature: 48,
          batteryVoltage: 1.5,
        },
        fr: {
          pressure: getNextTemperature(1),
          temperature: 52,
          batteryVoltage: 1.6,
        },
        rr: {
          pressure: getNextTemperature(2),
          temperature: 51,
          batteryVoltage: 1.4,
        },
        rl: {
          pressure: getNextTemperature(3),
          temperature: 49,
          batteryVoltage: 1.3,
        },
      })
    })
}

export default {
  start,
  data,
}
