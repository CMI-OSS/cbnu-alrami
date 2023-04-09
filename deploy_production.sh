git clean -df
git reset --hard
git pull
yarn
yarn build:server
pm2 stop cbnu_alrami_server_production
pm2 stop cbnu_alrami_scraper_production
pm2 start ./packages/server/dist/main.js --name cbnu_alrami_server_production
pm2 start yarn --name cbnu_alrami_scraper_production -- start:scraper
