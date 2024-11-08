import {useState}    from "react"
import configuration from "../lib/configuration"

const DEFAULT = {
  "temperatureMax": "120",
     "pressureMin": "2",
}

/**
 *
 */
const load = async()=>{
  const options = await configuration.load(DEFAULT)

  options.temperatureMax = Number(options.temperatureMax)
  options.pressureMin    = Number(options.pressureMin)

  return options
}

/**
 *
 */
const save = async(Options)=>{
  await configuration.save(Options)
}

export default {
  load,
  save,
}
