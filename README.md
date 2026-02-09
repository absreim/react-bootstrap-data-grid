# Introduction

This is the repository for React Bootstrap Data Grid.

Inspired by [react-bootstrap-table2](https://react-bootstrap-table.github.io/react-bootstrap-table2/)
and [MUI X Data Grid](https://mui.com/x/react-data-grid/),
React Bootstrap Data Grid aims to fill the specific niche of a data grid
UI component for the combination of Bootstrap and React.

# Project structure

The project currently consists of a documentation site built with the [NextJS](https://nextjs.org) framework with live
examples of the data grid.

The documentation site is located at `src/app` while the data grid component is located at `src/grid`.

## Building the files for distribution as an NPM package

Run the `build:package` npm script to build the source files for the data grid component and output the build products
to the `src/grid/dist` directory. All files in the `src/grid/dist` directory are not meant to be checked into version
control, except for `src/grid/dist/package.json` and `src/grid/dist/README.md`, which are maintained by hand.

## Publishing

To publish a package after successfully building it for distribution, change to the `dist` subdirectory and
use the NPM CLI:

```bash
cd ./dist
```

Login with the NPM CLI. Run the following command and click the login link to log in with your browser.

```bash
npm login
```

Then publish with npm. You will once again need to log in via the link displayed by the command below:

```bash
npm publish --access public
```

Note that for the above steps to work, one needs to have permission to publish to the specified scope.

## Automated tests

One can run the automated tests in the `tests` subdirectory by invoking the `test` NPM script. The
tests are currently being run against pages specifically built as targets for Playwright tests. The pages are in hidden
paths in the documentation site.

The pages meant as test targets currently import from the code source directory `src/grid`. One can change the import to
instead import the build products meant for distribution. Running tests this way can be
useful if there is any concern about the fitness of the build products.

Specifically, in `src/app/test/page.tsx`, one can change line 3 from

```tsx
import Grid, { ColDef, RowDef } from "@/grid";
```

to

```tsx
import Grid, { ColDef, RowDef } from "@/grid/dist";
```

Of course, since the build products are not checked into version control, one must first build the build products from
source in order for the tests written in the way of the second example to work.

# Getting started

## Using the data grid component

Please refer to the documentation site, either at https://react-bootstrap-data-grid.vercel.app/, or at a local
development server that can be run according to the instructions in the next section.

## Making changes to the code in this repository

One way to preview the changes one makes to the data grid component's code is to add, edit and/or view code examples in
the documentation site. For example, if one were to add a new feature to the data grid component, one can create a new
entry in the documentation site documenting that change. Doing so serves the dual purpose of writing documentation for
the feature and manually testing the feature.

This repository officially only supports NPM as a package manager at the moment. To start the development server, run
the following command:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

After modifying the files for documentation site and/or the data grid component, you should be able to see the results
in your browser as the Next.js development server automatically refreshes the page your browser in response to changes.
