"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEndpointUrl = void 0;
const buildEndpointUrl = ({ coinGeckoApiURL, token, currencyListJoined }) => {
    const buildedEnpointUrl = `${coinGeckoApiURL}/price?ids=${token}&vs_currencies=${currencyListJoined}`;
    return buildedEnpointUrl;
};
exports.buildEndpointUrl = buildEndpointUrl;
