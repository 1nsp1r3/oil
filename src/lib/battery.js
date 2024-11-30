

const table = [
  { voltage: 3.0, percentage: 100 },
  { voltage: 2.9, percentage: 90 },
  { voltage: 2.8, percentage: 80 },
  { voltage: 2.7, percentage: 70 },
  { voltage: 2.6, percentage: 60 },
  { voltage: 2.5, percentage: 50 },
  { voltage: 2.4, percentage: 40 },
  { voltage: 2.3, percentage: 30 },
  { voltage: 2.2, percentage: 20 },
  { voltage: 2.1, percentage: 10 },
  { voltage: 2.0, percentage: 0 },
]

const getPercent = (Voltage) => {
  if (Voltage >= table[0].voltage) return 100 //>= 3.0V
  if (Voltage <= table[table.length-1].voltage) return 0 //<= 2.0V

  for (let i=0;i<table.length-1;i++){
    const upper = table[i]
    const lower = table[i+1]
    if (Voltage == upper.voltage) return upper.percentage
    if (Voltage == lower.voltage) return lower.percentage

    if (Voltage > lower.voltage){
      //Voltage
      const gapV = upper.voltage - lower.voltage //0.10V
      const normalizeV = Voltage - lower.voltage //2.74 -> 0.04V
      const ratioV = normalizeV / gapV           //0.4

      //Percent
      const gapP = upper.percentage - lower.percentage //10
      const result = Math.round(gapP * ratioV * 100)/100 //10 x 0.4 -> 4%
      return lower.percentage+result //70 + 4 -> 74
    }
  }

  return 0
}

export default {
  getPercent,
}
