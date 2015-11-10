'use strict';

const  path = require('path'),
         fs = require('fs'),
     rimraf = require('rimraf'),
       exec = require('child_process').exec,
       keys = Object.keys || require('object-keys');

function reinstall(PACKAGE_JSON, dir, callback) {
  const DEPS = PACKAGE_JSON.dependencies && keys(PACKAGE_JSON.dependencies) || [],
    DEV_DEPS = PACKAGE_JSON.devDependencies && keys(PACKAGE_JSON.devDependencies) || [],
    OPT_DEPS = PACKAGE_JSON.optionalDependencies && keys(PACKAGE_JSON.optionalDependencies) || [];

  exec('cd ' + dir + ' && npm install ' + DEPS.concat(DEV_DEPS).concat(OPT_DEPS).join(' '), function(err, stdout, stderr) {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
    console.log('\nYay! Dependencies reinstalled from scratch.');
  });
}

exports.execute = function(targetDir, callback) {
  targetDir = targetDir || './';
  const data = fs.readFileSync(path.resolve(targetDir + '/package.json'));

  if (!data) {
    throw 'No package.json in ' + path.resolve(targetDir);
  }

  const PACKAGE_JSON = JSON.parse(data),
        NODE_MODULES = path.resolve(targetDir + '/node_modules');

  fs.stat(NODE_MODULES, function(err, stats) {
    if (err) {
      var reinstalled = false;
      switch (err.code) {
        case 'ENOENT':
          // node_modules doesn't exist: just reinstall
          reinstall(PACKAGE_JSON, path.resolve(targetDir), callback);
          reinstalled = true;
          break;
      }
      if (!reinstalled) {
        callback(err);
      }
      return;
    }
    console.log('Removing existing dependencies...');
    // call rm -rf on the NODE_MODULES dir
    rimraf(NODE_MODULES, function(err) {
      if (err) {
        // TODO: error handling?
        // switch (err.code) {
        //   case 'ENOENT':
        //     console.log('');
        //     break;
        // }
        console.log(err);
        callback(err);
        return;
      }
      reinstall(PACKAGE_JSON, path.resolve(targetDir), callback);
    });
  });
};
