import {it}    from "@jest/globals"
import battery from "../src/lib/battery"

/**
 *
 */
it("4.0v should return 100%", () => {
  const ret = battery.getPercent(4.0)
  expect(ret).toBe("100%")
})

/**
 *
 */
it("3.0v should return 100%", () => {
  const ret = battery.getPercent(3.0)
  expect(ret).toBe("100%")
})

/**
 *
 */
it("2.8v should return 80%", () => {
  const ret = battery.getPercent(2.8)
  expect(ret).toBe("80%")
})

/**
 *
 */
it("2.79v should return 79%", () => {
  const ret = battery.getPercent(2.79)
  expect(ret).toBe("79%")
})


/**
 *
 */
it("2.74v should return 74%", () => {
  const ret = battery.getPercent(2.74)
  expect(ret).toBe("74%")
})

/**
 *
 */
it("2.71v should return 71%", () => {
  const ret = battery.getPercent(2.71)
  expect(ret).toBe("71%")
})

/**
 *
 */
it("2.5v should return 50%", () => {
  const ret = battery.getPercent(2.5)
  expect(ret).toBe("50%")
})

/**
 *
 */
it("2.2v should return 20%", () => {
  const ret = battery.getPercent(2.2)
  expect(ret).toBe("20%")
})

/**
 *
 */
it("2.0v should return 0%", () => {
  const ret = battery.getPercent(2.0)
  expect(ret).toBe("0%")
})

/**
 *
 */
it("0.0v should return 0%", () => {
  const ret = battery.getPercent(0.0)
  expect(ret).toBe("0%")
})

/**
 *
 */
it("-1.0v should return 0%", () => {
  const ret = battery.getPercent(-1.0)
  expect(ret).toBe("0%")
})