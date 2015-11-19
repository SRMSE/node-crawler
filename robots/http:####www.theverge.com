{"entries":[{"userAgents":["CCBot"],"rules":[],"crawl_delay":"10"},{"userAgents":["Yandex"],"rules":[],"crawl_delay":"10"},{"userAgents":["Applebot"],"rules":[],"crawl_delay":"10"},{"userAgents":["archive.org_bot"],"rules":[],"crawl_delay":"10"},{"userAgents":["ia_archiver"],"rules":[],"crawl_delay":"10"},{"userAgents":["Googlebot-News"],"rules":[{"path":"%2Fsponsored","allowance":false}]},{"userAgents":["Googlebot"],"rules":[{"path":"%2Fplatform%2Famp%2F*","allowance":true}]},{"userAgents":["facebookexternalhit"],"rules":[{"path":"%2Ffbia%2F*","allowance":true}]}],"sitemaps":["http://www.theverge.com/google_news_sitemap"],"defaultEntry":{"userAgents":["*"],"rules":[{"path":"%2Fadmin","allowance":false},{"path":"%2Fnewfanshot","allowance":false},{"path":"%2Fusers%2F*%2Freplies","allowance":false},{"path":"%2Fsearch","allowance":false},{"path":"%2Faccount","allowance":false},{"path":"%2Flogin","allowance":false},{"path":"%2Fchorus_auth","allowance":false},{"path":"%2Fnetworks%2Fenter_private_mode_password","allowance":false},{"path":"%2F*%3F","allowance":false},{"path":"%2Fplatform%2Famp%2F*","allowance":false},{"path":"%2Ffbia","allowance":false}]},"disallowAll":false,"statusCode":200,"allowAll":false,"options":{"headers":{"userAgent":"Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20100101 Firefox/5.0"}},"url":"http://www.theverge.com/robots.txt","chunks":["User-agent: *\nDisallow: /admin\nDisallow: /newfanshot\nDisallow: /users/*/replies\nDisallow: /search\nDisallow: /account\nDisallow: /login\nDisallow: /chorus_auth\nDisallow: /networks/enter_private_mode_password\nDisallow: /*?\nDisallow: /platform/amp/*\nDisallow: /fbia\n\nSitemap: http://www.theverge.com/google_news_sitemap\n\nUser-agent: CCBot\nCrawl-delay: 10\n\nUser-agent: Yandex\nCrawl-delay: 10\n\nUser-agent: Applebot\nCrawl-delay: 10\n\nUser-agent: archive.org_bot\nCrawl-delay: 10\n\nUser-agent: ia_archiver\nCrawl-delay: 10\n\nUser-agent: Googlebot-News\nDisallow: /sponsored\n\nUser-agent: Googlebot\nAllow: /platform/amp/*\n\nUser-agent: facebookexternalhit\nAllow: /fbia/*\n",null]}