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

## Automated tests

One can run the automated tests in the `src/grid/dist/__tests__` by invoking the `test` or `test:watch` NPM script. The
tests are currently directly importing the source files for the data grid component (rooted at `src/grid/index.ts`).

One can change the import to instead import the build products meant for distribution. Running tests this way can be
useful if there is any concern about the fitness of the build products.

Specifically, in `src/grid/__tests__/component.test.tsx`, one can change line 3 from

```tsx
import Grid, { ColDef, RowDef } from "../index";
```

to

```tsx
import Grid, { ColDef, RowDef } from "../dist";
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

To run the development server run one of the following, depending on your package manager of choice:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

After modifying the files for documentation site and/or the data grid component, you should be able to see the results
in your browser as the NextJS development server automatically refreshes the page your browser in response to changes
in the files.