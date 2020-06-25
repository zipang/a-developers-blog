module.exports = {
	title: "A Developer's Blog",
	tagline: "Just a place to note what i have to do over and over again when installing new environments (linux, javascript)",
	url: "https://eidolon-labs.com",
	baseUrl: "/",
	favicon: "img/favicon.png",
	organizationName: "Eidolon Labs", // Usually your GitHub org/user name.
	projectName: "a-developers-blog", // Usually your repo name.
	themeConfig: {
		navbar: {
			title: "A developer's blog",
			logo: {
				alt: "Eidolon Labs",
				src: "img/logo.png"
			},
			links: [
				{
					to: "docs/",
					activeBasePath: "docs",
					label: "Docs",
					position: "left"
				},
				{ to: "blog", label: "Blog", position: "left" },
				{
					href: "https://github.com/facebook/docusaurus",
					label: "GitHub",
					position: "right"
				}
			]
		},
		footer: {
			style: "dark",
			links: [

				{
					title: "Community",
					items: [
						{
							label: "Stack Overflow",
							href: "https://stackoverflow.com/questions/tagged/docusaurus"
						},
						{
							label: "Discord",
							href: "https://discordapp.com/invite/docusaurus"
						},
						{
							label: "Twitter",
							href: "https://twitter.com/docusaurus"
						}
					]
				},
				{
					title: "More",
					items: [
						{
							label: "Blog",
							to: "blog"
						},
						{
							label: "GitHub",
							href: "https://github.com/zipang/a-developers-blog"
						}
					]
				}
			],
			copyright: `Copyright © ${new Date().getFullYear()} - Eidolon Labs.`
		}
	},
	presets: [
		[
			"@docusaurus/preset-classic",
			{
				docs: {
					// It is recommended to set document id as docs home page (`docs/` path).
					homePageId: "doc1",
					sidebarPath: require.resolve("./sidebars.js"),
					// Please change this to your repo.
					editUrl: "https://github.com/facebook/docusaurus/edit/master/website/"
				},
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					editUrl:
						"https://github.com/facebook/docusaurus/edit/master/website/blog/"
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css")
				}
			}
		]
	]
};
