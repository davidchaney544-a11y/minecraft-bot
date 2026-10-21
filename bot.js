const mineflayer = require('mineflayer')
const http = require('http')

// Fake Web Server for Render
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Dupe, Aura, and AutoEat Bot is online!')
})
server.listen(process.env.PORT || 3000)

const bot = mineflayer.createBot({
  host: 'Play.DupeAnarchy.com',
  port: 25565,
  version: '1.21.1',
  auth: 'microsoft'
})

bot.on('spawn', () => {
  console.log(' Cloud Bot Spawned: Slot 1 Sword Locked, Auto-Dupe & AutoEat Enabled!')
  
  // 1. Lock hotbar slot 1 (index 0) on spawn
  bot.setQuickBarSlot(0)

  // 2. Automated KillAura Loop (Runs every 1 second)
  setInterval(() => {
    // Only target mobs if the bot isn't currently eating food
    if (bot.food {
      return entity.type === 'mob' && (entity.kind === 'Hostile Mobs' || entity.name === 'zombie' || entity.name === 'skeleton')
    })

    if (target) {
      bot.lookAt(target.position.offset(0, target.height / 2, 0))
      if (bot.entity.position.distanceTo(target.position) < 3.8) {
        bot.attack(target)
      }
    }
  }, 1000)

  // 3. Automated Dupe Command Loop (Runs every 10 seconds)
  setInterval(() => {
    console.log(' Sending automated dupe command packet...')
    bot.chat('/dupe enchanted_golden_apple 64')
  }, 10000)
})

// 4. METEOR FEATURE REPLICA: AutoEat (Checks health/hunger changes)
bot.on('health', () => {
  // Triggers if your hunger bar drops below 7 full food icons
  if (bot.food < 14) { 
    // Searches inventory for standard food items or your duped gapples
    const foodItem = bot.inventory.items().find(item => 
      item.name.includes('cooked') || item.name === 'bread' || item.name === 'enchanted_golden_apple' || item.name === 'apple'
    )
    
    if (foodItem) {
      console.log(` Hunger low (${bot.food}/20). Equipping ${foodItem.name} to eat...`)
      
      // Equip food, consume it, then switch back to the sword slot
      bot.equip(foodItem, 'hand')
        .then(() => {
          bot.activateItem() // Simulates holding right-click to eat
          
          // Minecraft consumption takes 1.6 seconds; we wait 2.5 seconds to guarantee completion
          setTimeout(() => {
            bot.deactivateItem() // Releases right-click
            bot.setQuickBarSlot(0) // Swaps back to hotbar slot 1 sword
            console.log(' Swapped back to hotbar slot 1 sword.')
          }, 2500)
        })
        .catch(err => console.log(`[AutoEat Exception]: ${err.message}`))
    }
  }
})

bot.on('error', (err) => console.log(`[Error]: ${err}`))
bot.on('kicked', (reason) => console.log(`[Kicked]: ${reason}`))
