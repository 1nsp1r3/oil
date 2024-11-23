import {it} from "@jest/globals"
import tpms from "../src/sensor/tpms"

/**
 *
 */
it("80:EA:CA:10:2B:BC should be a sysgration", () => {
  expect(tpms.isSysgration({id: "80:EA:CA:10:2B:BC"})).toBeTruthy()
})

/**
 *
 */
it("81:EA:CA:20:3B:E5 should be a sysgration", () => {
  expect(tpms.isSysgration({id: "81:EA:CA:20:3B:E5"})).toBeTruthy()
})

/**
 *
 */
it("AC:15:85:01:DC:E0 should not be a sysgration", () => {
  expect(tpms.isSysgration({id: "AC:15:85:01:DC:E0"})).toBeFalsy()
})
