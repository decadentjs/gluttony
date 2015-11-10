[![Build Status](https://travis-ci.org/isaacs/gluttony.svg?branch=master)](https://travis-ci.org/isaacs/gluttony)
[![Dependency Status](https://david-dm.org/isaacs/gluttony.svg)](https://david-dm.org/isaacs/gluttony)
[![devDependency Status](https://david-dm.org/isaacs/gluttony/dev-status.svg)](https://david-dm.org/isaacs/gluttony#info=devDependencies)


# gluttony

Nukes the project's `node_modules` directory and reinstalls latest dependencies from `package.json`.

# Rationale

Often times you just want to delete all node modules and reinstall all dependencies from scratch with latest version.
If you recognize yourself in this description, then `gluttony` is for you.

Invoke on any directory containing a `package.json`, and it will remove the `node_modules` directory if exists, and
reinstall the _latest version_ of all dependencies via `npm`.

# Usage

Install:

```bash
npm install -g gluttony
```

Use to reinstall dependencies of a project

```bash
gluttony
```

# License

MIT
