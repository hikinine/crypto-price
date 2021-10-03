import axios from "axios"
import { proxyApiKey, proxyApiUrl } from "../../config.json"

interface IProxy {
  host: string;
  port: number;
  auth: {
    username: string;
    password: string;
  };
}

interface IApiResponse {
  username: string
  password: string
  proxy_address: string
  ports: {
    http: number
  }
}

class GetProxies {
  private proxies: IProxy[] = []

  async execute(): Promise<IProxy[]> {
    const response = await axios.get(proxyApiUrl,
      {
        headers: {
          Authorization: proxyApiKey,
        },
      }
    )

    const data = response.data
    const proxies: IApiResponse[] = data.results

    proxies.forEach(proxy => {
      const port: number = proxy.ports.http

      this.proxies.push({
        auth: {
          username: proxy.username,
          password: proxy.password,
        },
        host: proxy.proxy_address,
        port: port,
      })
    })

    return this.proxies
  }
}

export { GetProxies, IProxy }