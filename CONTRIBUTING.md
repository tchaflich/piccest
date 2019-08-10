
# Contribution to piccest

## How to install and build

See [README.md](README.md) for more information.

This project uses [webpack](https://webpack.github.io/); while developing, you may want to use `npx webpack --watch` for ease of development.

## How to open an issue

There is currently no issue template. Just submit as detailed a description as you can.

## How to submit a pull request

There are two scripts that must pass:

1. `npm run lint`
1. `npm run test`

If you have added any interfaces or other static helper classes or mixins, you are required to write tests for them.

The codebase is required to be free of lint errors, with no eslint-disable statements. Lint warnings are discouraged.
