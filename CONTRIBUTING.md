The project currently consists of a site built with the [Next.js](https://nextjs.org) framework that is meant to be the
target of Playwright tests.

The code for the test site is located at `src/app` while the data grid component is located at `src/grid`.

The documentation site for this project is in
a [separate repo](https://github.com/absreim/react-bootstrap-data-grid-docs).

# Building the files for distribution as an NPM package

Run the `build:package` npm script to build the source files for the data grid component and output the build products
to the `/dist` directory. All files in the `/dist` directory are not meant to be checked into version
control.

Files in the `/dist-templates` directory are copied over to the `/dist` directory by the build script. These files
must be maintained by hand.

## Testing the built package

Note that it is very possible for the built package to not be usable even if the automated tests all pass. There are
some significant differences between the code in the package and that used by the test site.

Some possible issues include:

- The `package.json` file meant for the distributed package is maintained manually. (That `package.json` file is in
  `/dist-templates`.) The dependency list for this file is also manually maintained. If the list does not include all
  needed packages, a different project that imports that package may fail to run due a missing dependency.
- The TypeScript configuration (tsconfig.json in `src/grid`) compiles the code in a way that the importing project may
  not be compatible with.

The only way to have confidence that built package works is to actually import the package and use it.

The [documentation site repo](https://github.com/absreim/react-bootstrap-data-grid-docs) for this project imports the
package directly from NPM and serves as a smoke test for newly built versions of the grid component. A typical workflow
when contributing to this repo would be to first publish the new version to NPM and then update the documentation site
to import the new version and include documentation for it.

Note, however, that once a package with a certain version number is published to NPM, it is not possible to overwrite
the contents of that version should bugs arise. Therefore, if significant changes were made to the structure of the code
such that integrity of the built package is in question, it makes sense to test the build package locally before
publishing to NPM. One can do so by using `npm pack` to create a tarball and then installing it the documentation repo.

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

# Automated tests

One can run the automated tests in the `tests` subdirectory by invoking the `test` NPM script. The
tests are currently being run against pages specifically built as targets for Playwright tests.

Additionally, one can run the `test:ui` npm script to bring up the Playwright UI to run the tests.

# Development workflow

One way to preview the changes one makes to the data grid component's code is to add, edit and/or view code examples in
the test site. For example, if one were to add a new feature to the data grid component, one can create a new test page
that makes use of the new feature. Doing so serves the dual purpose manually testing the feature and creating a
target at which to run Playwright tests.

This repository officially only supports NPM as a package manager at the moment. To start the development server, run
the following command:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

After modifying the files for test site and/or the data grid component, you should be able to see the results
in your browser as the Next.js development server automatically refreshes the page your browser in response to changes.