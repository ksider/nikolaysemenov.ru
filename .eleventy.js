module.exports = function (eleventyConfig) {
  // Existing public files keep their current URLs in the generated site.
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("black");

  [
    "CNAME",
    "CV_Components_Reference.html",
    "favicon.png",
    "favicon.svg",
    "nikolai_semenov_cv.pdf",
    "pop_up.html",
    "robots.txt",
    "script.js",
    "sitemap.xml",
    "yandex_f8dc207fd6264191.html",
  ].forEach((file) => eleventyConfig.addPassthroughCopy(file));

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["njk"],
  };
};
