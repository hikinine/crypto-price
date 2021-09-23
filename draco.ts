import {Client} from "discord.js"
import axios from "axios"

import * as _ from "./config.json"

const API_URL = "https://api.mir4global.com/wallet/prices/draco/lastest"

export default () => {

  const draco = new Client()

  draco.login(_.DISCORD_KEY_DRACO)


  draco.on("ready", () => {

    console.log("draco-coin online")

    setInterval(async () => { 
      try{
        const response = await axios.post(API_URL)
                
        if (response.data?.Data?.DracoPrice) {
          draco.user?.setActivity({
            type: "PLAYING",
            name: `$${response.data?.Data?.DracoPrice.substr(0, 6)}`
          })
        }
      }
      catch(err) {
        console.log(err)
      }     
    }, 1000 * 30)
  })
} 