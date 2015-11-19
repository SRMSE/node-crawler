{"entries":[{"userAgents":["ia_archiver"],"rules":[{"path":"%2F","allowance":false}]},{"userAgents":["Bot@FindInArticles.com"],"rules":[{"path":"%2F","allowance":false}]},{"userAgents":["Slurp"],"rules":[],"crawl_delay":"1.0"},{"userAgents":["Yahoo Pipes 1.0"],"rules":[{"path":"%2F","allowance":false}]},{"userAgents":["Yahoo Pipes 2.0"],"rules":[{"path":"%2F","allowance":false}]},{"userAgents":["008"],"rules":[{"path":"%2F","allowance":false}]},{"userAgents":["Mediapartners-Google"],"rules":[{"path":"","allowance":true}]}],"sitemaps":["http://ezinearticles.com/sitemap_index.xml","http://ezinearticles.com/image_sitemap_index.xml"],"defaultEntry":{"userAgents":["*"],"rules":[{"path":"%2Fezinepublisher%2F","allowance":false},{"path":"%2Fholidaylogos%2F","allowance":false},{"path":"%2Fmaintenance.html","allowance":false},{"path":"%2Fmanage-subscriptions%2F","allowance":false},{"path":"%2Fmissing.html","allowance":false},{"path":"%2Fmissing.php","allowance":false},{"path":"%2Fpressreleases.html","allowance":false},{"path":"%2Frecommend.php","allowance":false},{"path":"%2Fprof_recommend.php","allowance":false},{"path":"%2F%3Fstxt%3D","allowance":false},{"path":"%2Fsearch%2F","allowance":false},{"path":"%2Fstopwords.txt","allowance":false},{"path":"%2Fthankyou%2F","allowance":false},{"path":"%2Fthief.html","allowance":false},{"path":"%2Ftraffic%2F","allowance":false},{"path":"%2Fblockcheck.php","allowance":false},{"path":"%2Fresults%2F","allowance":false},{"path":"%2Fgoogle-search","allowance":false},{"path":"%2Freport-this-author","allowance":false},{"path":"%2Freport-this-article","allowance":false},{"path":"%2Fshare%2F","allowance":false},{"path":"%2Frpc%2F","allowance":false},{"path":"%2Fga%2F","allowance":false},{"path":"%2Fwidget%2F","allowance":false},{"path":"%2Fincludes%2Fadsense%2F","allowance":false},{"path":"%2Fout.php","allowance":false},{"path":"%2Ftrusted-results%2F","allowance":false},{"path":"%2Fcaptcha%2F","allowance":false},{"path":"%2Fblank%2F","allowance":false},{"path":"%2Fencrypt%2F","allowance":false}]},"disallowAll":false,"statusCode":200,"allowAll":false,"options":{"headers":{"userAgent":"Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20100101 Firefox/5.0"}},"url":"http://ezinearticles.com/robots.txt","chunks":["User-agent: ia_archiver\nDisallow: /\n\nUser-agent: Bot@FindInArticles.com\nDisallow: /\n\nUser-agent: Slurp\nCrawl-delay: 1.0\n\nUser-agent: Yahoo Pipes 1.0\nDisallow: /\n\nUser-agent: Yahoo Pipes 2.0\nDisallow: /\n\nUser-agent: 008\nDisallow: /\n\nUser-agent: Mediapartners-Google\nDisallow:\n\nUser-agent: *\nDisallow: /ezinepublisher/\nDisallow: /holidaylogos/\nDisallow: /maintenance.html\nDisallow: /manage-subscriptions/\nDisallow: /missing.html\nDisallow: /missing.php\nDisallow: /pressreleases.html\nDisallow: /recommend.php\nDisallow: /prof_recommend.php\nDisallow: /?stxt=\nDisallow: /search/\nDisallow: /stopwords.txt\nDisallow: /thankyou/\nDisallow: /thief.html\nDisallow: /traffic/\nDisallow: /blockcheck.php\nDisallow: /results/\nDisallow: /google-search\nDisallow: /report-this-author\nDisallow: /report-this-article\nDisallow: /share/\nDisallow: /rpc/\nDisallow: /ga/\nDisallow: /widget/\nDisallow: /includes/adsense/\nDisallow: /out.php\nDisallow: /trusted-results/\nDisallow: /captcha/\nDisallow: /blank/\nDisallow: /encrypt/\n\nSitemap: http://ezinearticles.com/sitemap_index.xml\nSitemap: http://ezinearticles.com/image_sitemap_index.xml\n",null]}