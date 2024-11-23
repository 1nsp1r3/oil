import {useState}    from "react"
import configuration from "./lib/configuration"

const DEFAULT = {
         boschId: "",
            flId: "",
            frId: "",
            rlId: "",
            rrId: "",
  temperatureMax: "120",
     pressureMin: "2",
}

/**
 *
 */
const load = async()=>{
  const options = await configuration.load(DEFAULT)

  options.boschId        = options.boschId
  options.flId           = options.flId
  options.frId           = options.frId
  options.rlId           = options.rlId
  options.rrId           = options.rrId
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
