git clean -df
git reset --hard
git pull
yarn
# yarn build:admin
# yarn build:mobile
yarn build:server
pm2 stop all
# pm2 serve ./packages/admin/dist --port=5001 --spa --name cbnu_alrami_admin
# pm2 serve ./packages/mobile/dist --port=5002 --spa --name cbnu_alrami_mobile
pm2 start ./packages/server/dist/main.js --name cbnu_alrami_server
pm2 start yarn --name cbnu_alrami_scraper -- start:scraper
