const mineflayer = require('mineflayer')
const http = require('http')

// 1. Fake Web Server for Render (Keeps the service alive for free)
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Bot is online!')
})
server.listen(process.env.PORT || 3000, () => {
  console.log('Fake web server is listening...')
})

// 2. Your actual Minecraft Bot Code
const bot = mineflayer.createBot({
  host: '://dupeanarchy.com',
  port: 25565,
  version: '1.21.1',
  auth: 'microsoft'
})

bot.on('spawn', () => {
  console.log(' Success! The bot has spawned into DupeAnarchy.')
  
  // Anti-AFK Jump Loop
  setInterval(() => {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 500)
  }, 10000)
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  console.log(`[Chat] ${username}: ${message}`)
})

bot.on('error', (err) => console.log(`[Error]: ${err}`))
bot.on('kicked', (reason) => console.log(`[Kicked]: ${reason}`))
