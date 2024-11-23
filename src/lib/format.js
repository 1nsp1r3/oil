/**
 *        "4" -> "4.0"
 * "1.999999" -> "2.0"
 */
const toOneDecimal = (Value) => Intl.NumberFormat("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(Value)

/**
 *
 */
const numberOfSecondsSince = (DateTime) => {
  const now = new Date().getTime()
  const diff = now - DateTime
  return Math.round(diff/1000)
}

export default {
  toOneDecimal,
  numberOfSecondsSince,
}
