import * as numbersCtrl from './controllers/numbers'

export default function(app) {

  app.get('/', (req, res) => res.json({msg: 'Hello jolimoi'}) )

  app.get('/numbers/roman', numbersCtrl.requestRomanNumber)
  app.get('/numbers/romans/sse/response', numbersCtrl.sseResponseRomanNumber)

  // No route match
  app.use((req, res) => {
    return res.status(404).json({
      error: 'NoRouteMatch',
      msg: 'What are you doing ? Are you lost or did you try to broke this API ?'
    })
  })

}