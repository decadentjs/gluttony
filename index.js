'use strict';

const  path = require('path'),
         fs = require('fs'),
     rimraf = require('rimraf'),
        npm = require('npm'),
       keys = Object.keys || require('object-keys');

function reinstall(PACKAGE_JSON, dir, callback) {
  const DEPS = PACKAGE_JSON.dependencies && keys(PACKAGE_JSON.dependencies),
    DEV_DEPS = PACKAGE_JSON.devDependencies && keys(PACKAGE_JSON.devDependencies);

  npm.load({}, function (err) {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    var i = 0;
    [DEPS, DEV_DEPS]
      .filter(function(deps){return deps;})
      .forEach(function(deps, index, array){
        // FIXME: uh-oh, safe to use?
        npm.prefix = dir;
        npm.commands.install(deps, function (err, data) {
          if (err) {
            callback(err);
            return;
          }
          if (++i === array.length) {
            callback(null);
          }
          console.log('\nYay! Dependencies reinstalled from scratch.');
        });
      });
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
