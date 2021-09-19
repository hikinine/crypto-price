import priceChecker from "./bot"
import axios from "axios"
import * as _ from "./config.json"
import draco from "./draco"

(async () => {
  
  interface ProxyResults {
    host: string,
    port: number,
    auth: {
      username: string 
      password: string 
    }
  }
  let proxyList: ProxyResults[] | undefined

  try {

    if (!_.proxyApiKey.length) {  throw Error() }

    const __response = await axios.get("https://proxy.webshare.io/api/proxy/list/?page=1", {
      headers: {
        "Authorization": _?.proxyApiKey
      }
    })
    
    if (__response.data?.results?.length) {
      proxyList = [] as ProxyResults[]
      __response.data?.results?.map((proxyInfo: any) => {        
        const port: number = proxyInfo.ports.http
        proxyList?.push({
          auth: {
            username: proxyInfo.username,
            password: proxyInfo.password,
          },
          host: proxyInfo.proxy_address,
          port: port
        })
      })
    }
  }
  catch(err) { }

 
  const price = new priceChecker(_.currencyIdDecode.join(","), proxyList)
  price.init()


  draco()

})()




