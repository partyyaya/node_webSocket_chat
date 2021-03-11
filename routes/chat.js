// router
const Router = require('koa-router')
const router = new Router()

// ======================================================================
// ctx response
const resCtxJson = async (ctx, data) => {
  ctx.response.type = 'json'
  ctx.response.body = data
}
// ======================================================
router.get('/:id', async ctx => { 
})

module.exports = router
