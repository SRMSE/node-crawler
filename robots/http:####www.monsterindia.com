{"entries":[{"userAgents":["Googlebot"],"rules":[{"path":"","allowance":true}],"crawl_delay":"60"},{"userAgents":["Googlebot-Image"],"rules":[{"path":"","allowance":true}],"crawl_delay":"60"},{"userAgents":["MSNBot"],"rules":[{"path":"","allowance":true}]},{"userAgents":["Slurp"],"rules":[{"path":"","allowance":true}]},{"userAgents":["googlebot-mobile"],"rules":[{"path":"","allowance":true}]},{"userAgents":["YahooSeeker/M1A1-R2D2"],"rules":[{"path":"","allowance":true}]},{"userAgents":["MSNBOT_Mobile"],"rules":[{"path":"","allowance":true}]}],"sitemaps":[],"defaultEntry":{"userAgents":["*"],"rules":[{"path":"","allowance":true}]},"disallowAll":false,"statusCode":200,"allowAll":false,"options":{"headers":{"userAgent":"Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20100101 Firefox/5.0"}},"url":"http://www.monsterindia.com/robots.txt","chunks":["User-agent: Googlebot\nDisallow: \nCrawl-delay: 60\n\nUser-agent:  Googlebot-Image    # Googlebot\nDisallow:\nCrawl-delay: 60\n\nUser-agent: MSNBot\nDisallow: \nUser-agent: Slurp\nDisallow: \nUser-agent: googlebot-mobile\nDisallow:\nUser-Agent: YahooSeeker/M1A1-R2D2\nDisallow: \nUser-Agent: MSNBOT_Mobile\nDisallow:\nUser-agent: *\nDisallow: \n",null]}