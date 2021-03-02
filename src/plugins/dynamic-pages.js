const path = require( "path");
const globby = require( "globby");
const react = require("react");
const { parseMarkdownFile, fileToPath, aliasedSitePath }  = require("@docusaurus/utils");

const _DEFAULT_OPTIONS = {
	contentDirs: ["content"], // where local text content is stored in markdown + front matter format
	defaultLayout: "_blank",
	layouts: {
		"_blank": () => "BLANK TEMPLATE"
	}
};

/**
 * Docusaurus Pages Templates Plugin
 * This Docusaurus plugin renders pages through deferring to template components
 * Pages metadata must therefore include the `template` field to specify which template should be used
 * Or else the rendering will be deferred to a default template
 * @returns 
 */
const dynamicPagesPlugin = (context, opts = {}) => {
	/**
	 * Extract site informations and plugin options
	 */
	const { siteDir } = context;
	const { contentDirs, defaultLayout, layouts } = { ..._DEFAULT_OPTIONS, ...opts };

	/**
	 * Reload when a markdown file if these paths changes
	 */
	const getPathsToWatch = () => contentDirs.map((p) => path.resolve(siteDir, p, "**/*.md"));

	/**
	 * Load files content (markdown+front-matter)
	 * @returns Promise<Array<ParsedMarkdown>>
	 */
	const loadContent = async () => {
		// Get the matching files full paths
		const files = await globby(contentDirs, {
			expandDirectories: {
				extensions: ["md"]
			},
			cwd: siteDir,
			gitignore: true
		});

		const parsedFiles = await Promise.all(
			files.map(async (fullpath) => {
				const { frontMatter, content, excerpt } = await parseMarkdownFile(
					fullpath
				);
				const metadata = {
					path: fileToPath(fullpath),
				}
				return {
					data: frontMatter,
					metadata,
					content,
					excerpt
				};
			})
		);

		return parsedFiles;
	};

	/**
	 * Create pages for each rendered markdown file
	 */
	const contentLoaded = async ({ content, actions }) => {
		const { addRoute } = actions;
		await Promise.all(
			content.map(async ({metadata}) => {
				const { layout } = metadata;
				// Find the layout component
				const layoutCmpnt = layouts[layout] || layouts[defaultLayout];

				if (typeof layoutCmpnt !== "function") {
					throw new TypeError(`Layout ${layout} isn't a valid React component. Cannot render page ${path}`)
				}

				addRoute({
					path: metadata.path,
					component: layoutCmpnt,
					exact: true
				});
			})
		);
	}

	/**
	 * Plugin object with dedicated lifecycle methods
	 */
	return {
		name: "dynamic-pages-plugin",
		getPathsToWatch,
		loadContent,
		contentLoaded
	};
};

module.exports = dynamicPagesPlugin;
