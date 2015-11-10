[![Build Status](https://travis-ci.org/decadentjs/gluttony.svg?branch=master)](https://travis-ci.org/decadentjs/gluttony)
[![Dependency Status](https://david-dm.org/decadentjs/gluttony.svg)](https://david-dm.org/decadentjs/gluttony)
[![devDependency Status](https://david-dm.org/decadentjs/gluttony/dev-status.svg)](https://david-dm.org/decadentjs/gluttony#info=devDependencies)


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

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015 Claudio Procida
