git pull
rm -rf ./node_modules
pm2 delete crypto-price
yarn install
pm2 start yarn --name crypto-price -- start
pm2 logs