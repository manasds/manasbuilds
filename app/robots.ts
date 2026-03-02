export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/"],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				crawlDelay: 0,
			},
		],
		sitemap: "https://manasbuilds.me/sitemap.xml",
		host: "https://manasbuilds.me",
	};
}