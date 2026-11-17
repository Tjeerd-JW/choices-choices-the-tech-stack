import { getLinkActiveState } from './src/_data/helpers.js';
export default function (eleventyConfig) {
    eleventyConfig.setInputDirectory('src');
    eleventyConfig.setOutputDirectory('dist');
    eleventyConfig.addPassthroughCopy('src/images');
    eleventyConfig.addLiquidFilter('activeState', getLinkActiveState);
    eleventyConfig.addPassthroughCopy("src/styles");
    eleventyConfig.addPassthroughCopy("src/assets");
}

export const config = {
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'liquid',
};