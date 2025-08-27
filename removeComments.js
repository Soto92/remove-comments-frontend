const { parse } = require("@babel/parser");
const generate = require("@babel/generator").default;
const postcss = require("postcss");
const safeParser = require("postcss-safe-parser");

/**
 * Remove comments from JS, TS, JSX, TSX, and CSS files
 * @param {string} code
 * @param {"js"|"ts"|"jsx"|"tsx"|"css"} type
 * @returns {Promise<string>}
 */
async function removeComments(code, type = "js") {
  if (!code) return "";

  // CSS
  if (type === "css") {
    try {
      const result = await postcss([
        (root) => root.walkComments((c) => c.remove()),
      ]).process(code, { from: undefined, parser: safeParser });
      return result.css ?? "";
    } catch {
      return code.replace(/\/\*[\s\S]*?\*\//g, "");
    }
  }

  // JS/TS/JSX/TSX
  const plugins = [];
  if (type === "ts" || type === "tsx") plugins.push("typescript");
  if (type === "jsx" || type === "tsx") plugins.push("jsx");

  try {
    const ast = parse(code, {
      sourceType: "unambiguous",
      plugins,
      allowReturnOutsideFunction: true,
      allowImportExportEverywhere: true,
      errorRecovery: true,
    });

    const output = generate(ast, {
      comments: false,
      compact: false,
    });

    return output.code ?? "";
  } catch {
    // Fallback regex
    return code
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove /* ... */
      .replace(/(^|[^:\\])\/\/.*$/gm, "$1"); // remove // ... lines
  }
}


module.exports = {
  removeComments,
};