{"entries":[],"sitemaps":[],"defaultEntry":{"userAgents":["*"],"rules":[{"path":"%2F6225870%2F","allowance":false},{"path":"%2F_s%2F","allowance":false},{"path":"%2Fsms-service*","allowance":false},{"path":"%2Fapartments-for-sale%3Fsearch_intent*","allowance":false},{"path":"%2Fapartments-for-rent%3Fsearch_intent*","allowance":false},{"path":"%2Fproperty-search*","allowance":false},{"path":"%2Flisting-search*","allowance":false},{"path":"%2Fproject-search*","allowance":false},{"path":"%2Fsem*","allowance":false},{"path":"%2Fweekend-guide*","allowance":false},{"path":"%2Fchannel*","allowance":false},{"path":"%2Fagent%2F*%2Fcfap-*%2Flistings-sale","allowance":false},{"path":"%2Fagent%2F*%2Fcfap-*%2Flistings-rent","allowance":false},{"path":"%2Flocation-listing%2F*","allowance":false}]},"disallowAll":false,"statusCode":200,"allowAll":false,"options":{"headers":{"userAgent":"Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20100101 Firefox/5.0"}},"url":"https://www.commonfloor.com/robots.txt","chunks":["User-agent: *\nDisallow: /6225870/\nDisallow: /_s/\nDisallow: /sms-service*\nDisallow: /apartments-for-sale?search_intent*\nDisallow: /apartments-for-rent?search_intent*\nDisallow: /property-search*\nDisallow: /listing-search*\nDisallow: /project-search*\nDisallow: /sem*\nDisallow: /weekend-guide*\nDisallow: /channel*\nDisallow: /agent/*/cfap-*/listings-sale\nDisallow: /agent/*/cfap-*/listings-rent\nDisallow: /location-listing/*\n",null]}