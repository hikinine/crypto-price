interface IBuildEndpointUrlProps {
    coinGeckoApiURL: string
    token: string
    currencyListJoined: string
}

const buildEndpointUrl = ({
    coinGeckoApiURL,
    token,
    currencyListJoined
}: IBuildEndpointUrlProps): string => {
    const buildedEnpointUrl = `${coinGeckoApiURL}/price?ids=${token}&vs_currencies=${currencyListJoined}`
    return buildedEnpointUrl
}

export { buildEndpointUrl }