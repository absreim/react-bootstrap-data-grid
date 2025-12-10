import { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'mixed-decls', 'import'],
    quietDeps: true,
    // TODO: keep an eye out for updated implementations bootstrap and highlight.js that do not use the deprecated
    // @import feature of Dart Sass
    // References: https://github.com/twbs/bootstrap/issues/40962,
    // https://sass-lang.com/blog/import-is-deprecated/
  }
}

export default nextConfig;
