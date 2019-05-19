import { transformToRomanNumber } from '../helpers/numbers'

export function getRomanNumber (req, res) {

  if (!req.query.number) {
    return res.status(400).json({error: 'MissingQueryParam', msg: 'Missing query param "number"'})
  }

  // Format string to number (if not a number return NaN)
  const number = Number(req.query.number)

  const romanNumber = transformToRomanNumber(number)

  if(romanNumber.error) {
    return res.status(400).json(romanNumber)
  }

  return res.json({
    romanNumber: romanNumber
  })
}