{"entries":[{"userAgents":["Mediapartners-Google*"],"rules":[{"path":"","allowance":true}]}],"sitemaps":[],"defaultEntry":{"userAgents":["*"],"rules":[{"path":"%2Flogin","allowance":false},{"path":"%2Fdashboard","allowance":false},{"path":"%2Fanalytics","allowance":false},{"path":"%2Flabs","allowance":false},{"path":"%2Fbookmark.php*","allowance":false},{"path":"%2Ftellfriend.php*","allowance":false},{"path":"%2Ffeed.php*","allowance":false},{"path":"%2Fprivacy%2Femail-opt-out%3F*","allowance":false}]},"disallowAll":false,"statusCode":200,"allowAll":false,"options":{"headers":{"userAgent":"Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20100101 Firefox/5.0"}},"url":"http://www.addthis.com/robots.txt","chunks":["User-agent: Mediapartners-Google* \nDisallow: \n\nUser-agent: *\nDisallow: /login\nDisallow: /dashboard\nDisallow: /analytics\nDisallow: /labs\nDisallow: /bookmark.php*\nDisallow: /tellfriend.php*\nDisallow: /feed.php*\nDisallow: /privacy/email-opt-out?*",null]}