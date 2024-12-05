import {it} from "@jest/globals"
import f    from "../src/lib/format"

/**
 *
 */
it("1.999999 should return 2.0", () => {
  const ret = f.toOneDecimal(1.999999)
  expect(ret.toString()).toBe("2.0")
})

/**
 *
 */
it("1.28 should return 1.3", () => {
  const ret = f.toOneDecimal(1.28)
  expect(ret.toString()).toBe("1.3")
})


/**
 *
 */
it("1.78 should return 1.8", () => {
  const ret = f.toOneDecimal(1.78)
  expect(ret.toString()).toBe("1.8")
})

/**
 *
 */
it("4 should return 4.0", () => {
  const ret = f.toOneDecimal(4)
  expect(ret.toString()).toBe("4.0")
})

/**
 *
 */
it("getHHMM() should return 08:02", () => {
  const ret = f.getHHMM(173343756005)
  expect(ret).toBe("08:02")
})
