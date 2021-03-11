let id = 0
let lookup = {}

const webSocket = (wss) => {
  wss.on('connection', (conn) => {
    // 使連線紀錄自己的連線號
    conn.id = id
    // 儲存目前連線的client端
    lookup[id] = conn
    id++

    conn.on('message', (data) => {
      console.log('received: %s', data)
      for (const [key, value] of Object.entries(lookup)) {
        if (conn.id !== parseInt(key)) {
          value.send(data)
        }
      }
    })

    conn.on('close', () => {
      console.log(`Close connected ${conn.id}`)
      delete lookup[conn.id]
    })
  })
}

module.exports = webSocket
