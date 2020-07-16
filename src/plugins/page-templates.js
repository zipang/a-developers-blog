import globby from "globby";
import fs from "fs";
import path from "path";
import { encodePath, fileToPath, aliasedSitePath } from "@docusaurus/utils";

const DEFAULT_OPTIONS = {
	defaultTemplate: "_default",
	path: "content", // place markdown files inside content directory
	templates: {}
};

/**
 *
 * @param {DocusaurusContext} context
 * @param {Object} opts
 */
function pluginPageTemplates(context, opts) {
	// Override default options with passed values
	const options = { ...DEFAULT_OPTIONS, ...opts };
	const contentPath = path.resolve(context.siteDir, options.path);

	return {
		name: "docusaurus-plugin-content-pages",

		getPathsToWatch() {
			const { include = [] } = options;
			const globPattern = include.map((pattern) => `${contentPath}/${pattern}`);
			return [...globPattern];
		},

		async loadContent() {
			const { include } = options;
			const { siteConfig, siteDir } = context;
			const pagesDir = contentPath;
			if (!fs.existsSync(pagesDir)) {
				return null;
			}
			const { baseUrl } = siteConfig;
			const pagesFiles = await globby(include, {
				cwd: pagesDir
			});
			return pagesFiles.map((relativeSource) => {
				const source = path.join(pagesDir, relativeSource);
				const aliasedSource = aliasedSitePath(source, siteDir);
				const pathName = encodePath(fileToPath(relativeSource));
				// Default Language.
				return {
					permalink: pathName.replace(/^\//, baseUrl || ""),
					source: aliasedSource
				};
			});
		},

		async contentLoaded({ content, actions }) {
			if (!content) {
				return;
			}
			const { addRoute } = actions;
			await Promise.all(
				content.map(async (metadataItem) => {
					const { permalink, source } = metadataItem;
					addRoute({
						path: permalink,
						component: source,
						exact: true
					});
				})
			);
		}
	};
}
exports.default = pluginPageTemplates;
