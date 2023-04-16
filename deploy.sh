
pm2 stop cbnu_alrami_scraper_test
pm2 delete cbnu_alrami_scraper_test
pm2 start yarn --name cbnu_alrami_scraper_test -- start:scraper
