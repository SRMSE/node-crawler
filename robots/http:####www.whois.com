{"entries":[],"sitemaps":[],"defaultEntry":{"userAgents":["*"],"rules":[{"path":"%2Frefresh.php","allowance":false},{"path":"%2Fwhois%2Frefresh.php","allowance":false},{"path":"%2Fdomain-registration%2Favailability.php","allowance":false},{"path":"%2Fprofile%2F","allowance":false}],"crawl_delay":"20"},"disallowAll":false,"statusCode":200,"allowAll":false,"options":{"headers":{"userAgent":"Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20100101 Firefox/5.0"}},"url":"http://www.whois.com/robots.txt","chunks":["User-agent: *\nDisallow: /refresh.php\nDisallow: /whois/refresh.php\nDisallow: /domain-registration/availability.php\nDisallow: /profile/\nCrawl-delay: 20\n",null]}