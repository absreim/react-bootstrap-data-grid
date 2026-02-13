#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// --------------------
// CONFIG
// --------------------
const root = path.resolve(__dirname, "./src/grid");
const distDir = "./dist";

const srcScss = path.join(root, "style.scss");
const distScss = path.join(distDir, "style.scss");
const distCss = path.join(distDir, "style.css");

const templateDir = path.join(__dirname, "dist-templates");

// --------------------
// HELPERS
// --------------------
function cleanDist(dir) {
  if (!fs.existsSync(dir)) return;

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

cleanDist(distDir);
copyWithDirs(srcScss, distScss);
compileScss(distScss, distCss);
compileTs(root);
copyDirContents(templateDir, distDir);
