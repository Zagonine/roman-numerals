import { transformToRomanNumber } from '../helpers/numbers'
import events from 'events'

let sseClientsWrite = {}

export function requestRomanNumber (req, res) {
  const clientId = req.query.clientId
  if (!clientId) {
    return res.status(400).json({error: 'MissingQueryParam', msg: 'Missing query param "clientId" for the response channel'})
  }

  if (!req.query.number) {
    return res.status(400).json({error: 'MissingQueryParam', msg: 'Missing query param "number"'})
  }

  // Format string to number (if not a number return NaN)
  const number = Number(req.query.number)

  const romanNumber = transformToRomanNumber(number)

  if(romanNumber.error) {
    return res.status(400).json(romanNumber)
  }

  setTimeout(() => { // setTimeout is there for fake the calculating response
    // Write the response in the good channel
    sseClientsWrite[clientId]({
      romanNumber: romanNumber
    })
  }, 3000)

  return res.json({
    status: 'pending'
  })
}

export function sseResponseRomanNumber (req, res) {
  // Client is used for write response in good channel (it's used in requestRomanNumber())
  const clientId = req.query.clientId
  if (!clientId) {
    return res.status(400).json({error: 'MissingQueryParam', msg: 'Missing query param "clientId"'})
  }

  res.status(200).set({
    'connection': 'keep-alive',
    'cache-control': 'no-cache',
    'content-type': 'text/event-stream'
  })

  // Add write function in global variable in order to let us write data in this channel
  sseClientsWrite[clientId] = (data) =>
    res.write(`data: ${JSON.stringify(data)}\n\n`)

  // Delete client entry when disconnect
  req.on('close', () => {
    delete sseClientsWrite[clientId]
  })

  res.write(`\n`)
}