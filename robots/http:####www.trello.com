{"entries":[],"sitemaps":[],"defaultEntry":{"userAgents":["*"],"rules":[{"path":"%2Fsearch%3F","allowance":false},{"path":"%2Freset%3F","allowance":false},{"path":"%2Fconfirm%3F","allowance":false},{"path":"%2FconfirmDelete%3F","allowance":false},{"path":"%2Fforgot%24","allowance":false},{"path":"%2Fboardinvited%2F","allowance":false},{"path":"%2Forganizationinvited%2F","allowance":false},{"path":"%2Fassociate%2F","allowance":false},{"path":"%2Fnot-supported.html","allowance":false},{"path":"%2Fstatic%2F","allowance":false},{"path":"%2F1%2F","allowance":false},{"path":"%2F","allowance":true}]},"disallowAll":false,"statusCode":200,"allowAll":false,"options":{"headers":{"userAgent":"Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20100101 Firefox/5.0"}},"url":"https://trello.com/robots.txt","chunks":["# Allow everything\nUser-agent: *\nDisallow: /search?\nDisallow: /reset?\nDisallow: /confirm?\nDisallow: /confirmDelete?\nDisallow: /forgot$\nDisallow: /boardinvited/\nDisallow: /organizationinvited/\nDisallow: /associate/\nDisallow: /not-supported.html\nDisallow: /static/\nDisallow: /1/\nAllow: /\n",null]}