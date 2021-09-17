scp config.json root@31.220.63.237:/root/crypto-price

dt=$(date '+%d/%m/%Y %H:%M:%S');
git add .
git commit -m "auto commit $dt"
git push
