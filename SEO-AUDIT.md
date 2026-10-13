# SEO audit — 2026-10-12

## Changes

- Homepage title: `Chin News & Falam News | Chin Lung Today` in initial HTML and React metadata (without a duplicate brand suffix).
- Matching homepage description and social metadata; canonical remains `https://chinlungtoday.com/`.
- A short, visible introduction inside the existing homepage News section describes Chin/Falam news and reporting in Falam Chin. Existing typography, article URLs, layouts, and functionality are unchanged.

## Rendering and discovery evidence

Tested public URL: https://chinlungtoday.com/news/kalay-ih-raltlan-falam-mipi-pawl-falam-khawpi

- Initial HTTP HTML has article metadata and JSON-LD, but no article paragraphs. React fetches the public API and renders the text; this alone is not evidence of a Google indexing failure.
- Live browser rendered HTML contains all five substantive Falam body paragraphs, including the final paragraph beginning “November 5 ih Falam Return Info”. Compared against the public API content: the repeated title and publication/date line are deliberately removed, not substantive body text.
- Body uses real `p` elements inside `article`, with an `h1` headline; news supports body `h2` headings. No login, click, or scroll is required to render the body. Feature articles also render full content as paragraphs, not preview truncations.
- React Router Links render ordinary anchors with real article URLs, using history routing rather than hash URLs. Section/category lists provide crawlable article links and load-more discovery; sitemap includes published articles independently of list limits.
- Live sitemap returned 244 URLs, including the tested article and its lastmod. Backend sitemap selects all published news/articles, uses the same section/slug mapping as frontend links, and does not include drafts.
- Live robots.txt allows public crawling, excludes `/admin`, and declares the sitemap.
- The tested rendered NewsArticle contains headline, description, image, published/modified dates, named author, publisher/logo, and canonical mainEntityOfPage. Backend initial metadata agrees on the article type and URL; feature articles use Article.
- Published public article API selects by slug or id and requires published status. Existing backend public story route returns 404 for unpublished/missing stories.

## Not yet verified: Google's own render/index

A browser DOM check is not Google's URL Inspection result. No Search Console access was available, so Google-rendered HTML, indexed status, crawl logs, and all individual URLs have not been independently verified. No SSR/prerendering architecture changes were made or proposed without evidence of a real failure.

After deployment, in Google Search Console:

1. Inspect the homepage; Test live URL; confirm title, description, introduction, and canonical.
2. Inspect the tested article above and at least one longer `/articles/` URL; Test live URL → View tested page → HTML. Search for both the first and final substantive paragraphs, outside JSON-LD. Check loaded resources and errors if missing.
3. Compare the indexed URL's rendered HTML with the live test. Confirm Google-selected canonical equals the existing article URL.
4. Submit/check `https://chinlungtoday.com/sitemap.xml` and request indexing for the homepage and representative articles. Submission does not guarantee indexing or ranking.
5. Only investigate rendering architecture if live inspection shows body text missing after resource/API issues are ruled out.

Reference: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
