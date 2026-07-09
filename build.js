#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// --------------------
// CONFIG
// --------------------
const isPro = process.argv[2] === "pro";
const srcDir = path.resolve(__dirname, "./src");
const communityRoot = path.resolve(srcDir, "./community");
const proRoot = path.resolve(srcDir, "./pro");
const root = isPro ? proRoot : communityRoot;
const distDir = `./dist/${isPro ? "pro" : "community"}`;
const packDir = `./package/${isPro ? "pro" : "community"}`;

const tableRoot = path.resolve(srcDir, "./table");
const proTableRoot = path.resolve(srcDir, "./table-pro");
const gridRoot = path.resolve(srcDir, "./grid");

const srcTableScss = path.join(tableRoot, "style.scss");
const distTableScss = path.join(distDir, "table.scss");
const distTableCss = path.join(distDir, "table.css");

const proSrcTableScss = path.join(proTableRoot, "style.scss");
const proDistTableScss = path.join(distDir, "table-pro.scss");
const proDistTableCss = path.join(distDir, "table-pro.css");

const srcGridScss = path.join(gridRoot, "style.scss");
const compilableGridScss = path.join(gridRoot, "compilable.scss");
const distGridScss = path.join(distDir, "grid.scss");
const distGridCss = path.join(distDir, "grid.css");

const templateDir = path.join(
  __dirname,
  `dist-templates/${isPro ? "pro" : "community"}`,
);

// --------------------
// HELPERS
// --------------------
function createDirs(...dirs) {
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

function cleanDist(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    entry.isDirectory()
      ? fs.rmSync(fullPath, { recursive: true, force: true })
      : fs.unlinkSync(fullPath);
  }
}

function copyWithDirs(src, dest) {
  fs.copyFileSync(src, dest);
}

function compileScss(src, dest) {
  execSync(
    `npx sass "${src}" "${dest}" --no-source-map --style=compressed --load-path=node_modules --silence-deprecation=import,if-function,global-builtin,color-functions`,
    {
      stdio: "inherit",
    },
  );
}

function compileTs(configDir) {
  execSync(`npx tsc -p "${configDir}"`, {
    stdio: "inherit",
  });
}

function copyDirContents(src, dest) {
  fs.cpSync(src, dest, { recursive: true });
}

// --------------------
// RUN
// --------------------
createDirs(distDir, packDir);
cleanDist(distDir);

if (isPro) {
  copyWithDirs(proSrcTableScss, proDistTableScss);
  compileScss(proSrcTableScss, proDistTableCss);
} else {
  copyWithDirs(srcTableScss, distTableScss);
  compileScss(srcTableScss, distTableCss);
}
copyWithDirs(srcGridScss, distGridScss);
compileScss(compilableGridScss, distGridCss);

compileTs(root);
copyDirContents(templateDir, distDir);
