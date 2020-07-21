import path from "path";
import globby from "globby";
import { parseMarkdownFile, normalizeUrl, aliasedSitePath } from "@docusaurus/utils";

const _DEFAULT_OPTIONS = {
	contentDirs: ["content"], // where local text content is stored in markdown + front matter format
	templateDirs: ["src/templates", "src/sections", "src/components"]
};

/**
 * Docusaurus Pages Templates Plugin
 * This Docusaurus plugin renders pages through deferring to template components
 * Pages metadata must therefore include the `template` field to specify which template should be used
 * Or else the rendering will be deferred to a default template
 */
const dynamicPagesPlugin = (context, opts = {}) => {
	/**
	 * Extract site informations and plugin options
	 */
	const { siteDir } = context;
	const pluginOptions = { ..._DEFAULT_OPTIONS, ...opts };
	const { contentDirs, templateDirs } = pluginOptions;

	/**
	 * Reload when a file if these paths changes
	 */
	const getPathsToWatch = () => [
		...contentDirs.map((p) => path.resolve(siteDir, p, "**/*.md")),
		...templateDirs.map((p) => path.resolve(siteDir, p, "**/*.js"))
	];

	/**
	 * Load files content (markdown+front-matter)
	 */
	const loadContent = async () => {
		// Get the matching files
		const files = await globby(include, {
			cwd: siteDir
		});

		files.map((fullpath) => {
			const parsedContent = parseMarkdownFile(fullpath);
		});
	};

	/**
	 * Create pages for each rendered markdown file
	 */
	const contentLoaded = async () => {};

	/**
	 * Plugin object with dedicated lifecycle methods
	 */
	return {
		name: "docusaurus-pages-templates-plugin",
		getPathsToWatch,
		loadContent,
		contentLoaded
	};
};

export default dynamicPagesPlugin;
