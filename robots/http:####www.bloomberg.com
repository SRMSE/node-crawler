{"entries":[{"userAgents":["Spinn3r"],"rules":[{"path":"%2Fpodcasts%2F","allowance":false},{"path":"%2Ffeed%2Fpodcast%2F","allowance":false},{"path":"%2Fbb%2Favfile%2F","allowance":false}]},{"userAgents":["Googlebot-News"],"rules":[{"path":"%2Fsponsor%2F","allowance":false}]}],"sitemaps":["http://www.bloomberg.com/feeds/sitemap_index.xml","http://www.bloomberg.com/feeds/sitemap_news.xml","http://www.bloomberg.com/feeds/politics_sitemap_news.xml","http://www.bloomberg.com/sitemap_index.xml","http://www.bloomberg.com/bcom/sitemaps/people-index.xml","http://www.bloomberg.com/bcom/sitemaps/private-companies-index.xml","http://www.bloomberg.com/bcom/sitemaps/public-companies-index.xml","http://www.bloomberg.com/sitemap_alt_test/sitemap_index.xml"],"defaultEntry":{"userAgents":["*","Mediapartners-Google*"],"rules":[{"path":"%2Fabout%2Fcareers","allowance":false},{"path":"%2Fabout%2Fcareers%2F","allowance":false},{"path":"%2Fofflinemessage%2F","allowance":false},{"path":"%2Fapps%2Ffbk","allowance":false},{"path":"%2Fbb%2Fnewsarchive%2F","allowance":false}]},"disallowAll":false,"statusCode":200,"allowAll":false,"options":{"headers":{"userAgent":"Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20100101 Firefox/5.0"}},"url":"http://www.bloomberg.com/robots.txt","chunks":["User-agent: *\nUser-agent: Mediapartners-Google*\nDisallow: /about/careers\nDisallow: /about/careers/\nDisallow: /offlinemessage/\nDisallow: /apps/fbk\nDisallow: /bb/newsarchive/\nSitemap: http://www.bloomberg.com/feeds/sitemap_index.xml\nSitemap: http://www.bloomberg.com/feeds/sitemap_news.xml\nSitemap: http://www.bloomberg.com/feeds/politics_sitemap_news.xml\nSitemap: http://www.bloomberg.com/sitemap_index.xml\nSitemap: http://www.bloomberg.com/bcom/sitemaps/people-index.xml\nSitemap: http://www.bloomberg.com/bcom/sitemaps/private-companies-index.xml\nSitemap: http://www.bloomberg.com/bcom/sitemaps/public-companies-index.xml\nSitemap: http://www.bloomberg.com/sitemap_alt_test/sitemap_index.xml\nUser-agent: Spinn3r\nDisallow: /podcasts/\nDisallow: /feed/podcast/\nDisallow: /bb/avfile/\nUser-agent: Googlebot-News\nDisallow: /sponsor/\n",null]}