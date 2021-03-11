// Operating environment
const httpPort = 8699

const testRoute = require('./routes/test')
const chatRoute = require('./routes/chat')
// ======================================================================
// Kernel
const http = require('http')
const Koa = require('koa')
const Router = require('koa-router')
const WebSocket = require('ws')
const WebSocketApi = require('./util/webSocket')
// Middleware
const bodyParser = require('koa-bodyparser')
const router = new Router()
const app = new Koa()
// 與webSocket共用port,將server提取出來
const server = http.createServer(app.callback())
const wss = new WebSocket.Server({
  server: server, path: `/chat`
})
WebSocketApi(wss)
// ======================================================================
// Error handler
const errorHandler = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      message: err.message
    }
  }
}

// Middleware
app.use(bodyParser())
app.use(errorHandler())
// ======================================================================
// Router
router.use(`/test`, testRoute.routes(), testRoute.allowedMethods())
router.use(`/chat`, chatRoute.routes(), chatRoute.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())
// ======================================================================
server.listen(httpPort, () => console.log(`Listening on port ${httpPort} (http)`))

module.exports = app
