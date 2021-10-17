git pull
rm -rf ./node_modules
pm2 delete crypto-factory
yarn install
pm2 start yarn --name crypto-factory -- start
pm2 logs