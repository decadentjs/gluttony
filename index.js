'use strict';

const pjson = require('pjson'),
       path = require('path'),
         fs = require('fs'),
     rimraf = require('rimraf'),
        npm = require('npm'),
       keys = Object.keys || require('object-keys');

const NODE_MODULES = path.resolve('./node_modules'),
              DEPS = pjson.dependencies && keys(pjson.dependencies),
          DEV_DEPS = pjson.devDependencies && keys(pjson.devDependencies);

function reinstall() {
  npm.load({}, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    [DEPS, DEV_DEPS].forEach(function(deps){
      if (deps) {
        npm.commands.install(deps, function (err, data) {
          if (err) {
            return;
          }
          console.log('\nYay! Dependencies reinstalled from scratch.');
        });
      }
    });
  });
}

exports.execute = function() {
  fs.stat(NODE_MODULES, function(err, stats) {
    if (err) {
      switch (err.code) {
        case 'ENOENT':
          // node_modules doesn't exist: just reinstall
          reinstall();
          break;
      }
      return;
    }
    console.log('Removing existing dependencies...');
    // call rm -rf on the NODE_MODULES dir
    rimraf(NODE_MODULES, function(err) {
      if (err) {
        // switch (err.code) {
        //   case 'ENOENT':
        //     console.log('');
        //     break;
        // }
        console.log(err);
        return;
      }
      reinstall();
    });
  });
};
