#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// --------------------
// CONFIG
// --------------------
const isPro = process.argv[2] === "pro";
const srcDir = path.resolve(__dirname, "./src");
const communityRoot = path.resolve(srcDir, "./grid");
const proRoot = path.resolve(srcDir, "./grid-pro");
const root = isPro ? proRoot : communityRoot;
const distDir = `./dist/${isPro ? "pro" : "community"}`;
const packDir = `./package/${isPro ? "pro" : "community"}`;

const srcScss = path.join(communityRoot, "style.scss");
const distScss = path.join(distDir, "style.scss");
const distCss = path.join(distDir, "style.css");

const proSrcScss = path.join(proRoot, "style.scss");
const proDistCss = path.join(distDir, "style.css");

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
  execSync(`npx sass "${src}" "${dest}" --no-source-map --style=compressed`, {
    stdio: "inherit",
  });
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
if (!fs.existsSync(srcScss)) {
  throw new Error(`Missing SCSS file: ${srcScss}`);
}

createDirs(distDir, packDir);
cleanDist(distDir);
if (isPro) {
  compileScss(proSrcScss, proDistCss);
} else {
  copyWithDirs(srcScss, distScss);
  compileScss(distScss, distCss);
}
compileTs(root);
copyDirContents(templateDir, distDir);
