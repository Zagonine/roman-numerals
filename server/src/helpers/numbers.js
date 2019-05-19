export function checkIntegerBetween(value, min, max) {
  // Check integer
  if (!Number.isInteger(value)) {
    return {error: 'WrongValue', msg: 'Number must be an integer'}
  }
  // Check integer between min and max
  if(value < min || value > max) {
    return {error: 'WrongValue', msg: `Number must be an integer between ${min} to ${max}`}
  }

  return {valid: true}
}

export function transformToRomanNumber (number) {
  const isValidNumber = checkIntegerBetween(number, 1, 100)
  if (isValidNumber.error) {
    return isValidNumber
  }

  const arrRomanValues = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}

  let roman = ''

  for (let i in arrRomanValues) {
    while (number >= arrRomanValues[i]) {
      roman += i
      number -= arrRomanValues[i]
    }
  }
  return roman
}