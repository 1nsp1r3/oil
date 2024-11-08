import {it}    from "@jest/globals"
import bleData from "../lib/bleData"

//Dataset
const device = {
  serviceData: {
    "uuid": "rx0=", //0xAF1D -> 0x1DAF -> 7599
  },
}

/**
 *
 */
it("75.99 psi should return 5.239 bars", ()=>{
  expect(
    bleData.psiToBar(75.99)
  ).toBeCloseTo(5.239, 3)
})

/**
 *
 */
it("extractTemperature should work", ()=>{
  expect(
    bleData.extractTemperature(device, "uuid")
  ).toBe(76)
})

/**
 *
 */
it("extractPressure should work", ()=>{
  expect(
    bleData.extractPressure(device, "uuid")
  ).toBe(5.2)
})
