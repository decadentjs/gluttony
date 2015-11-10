'use strict';

const gluttony = require('..'),
             t = require('tap'),
        rimraf = require('rimraf'),
            fs = require('fs'),
           cpr = require('cpr');

t.test('no_package', function (t) {
  t.throws(function(){
    gluttony.execute(__dirname + '/no_package');
  });
  t.end();
});

t.test('package_and_node_modules', function (t) {
  cpr(__dirname + '/_node_modules', __dirname + '/package_and_node_modules/node_modules', {
    deleteFirst: true, //Delete "to" before
    overwrite: true, //If the file exists, overwrite it
    confirm: true //After the copy, stat all the copied files to make sure they are there
  }, function(err, files) {
    t.ok(fs.statSync(__dirname + '/package_and_node_modules').isDirectory());
    t.ok(fs.statSync(__dirname + '/package_and_node_modules/node_modules').isDirectory());
    t.ok(fs.statSync(__dirname + '/package_and_node_modules/node_modules/object-keys').isDirectory());
    t.ok(fs.statSync(__dirname + '/package_and_node_modules/node_modules/path').isDirectory());
    t.ok(fs.statSync(__dirname + '/package_and_node_modules/node_modules/rimraf').isDirectory());

    gluttony.execute(__dirname + '/package_and_node_modules', function() {
      t.ok(fs.statSync(__dirname + '/package_and_node_modules').isDirectory());
      t.ok(fs.statSync(__dirname + '/package_and_node_modules/node_modules').isDirectory());
      t.ok(fs.statSync(__dirname + '/package_and_node_modules/node_modules/object-keys').isDirectory());
      t.ok(fs.statSync(__dirname + '/package_and_node_modules/node_modules/path').isDirectory());
      t.ok(fs.statSync(__dirname + '/package_and_node_modules/node_modules/rimraf').isDirectory());

      t.end();
    });
  });
});

t.test('package_no_node_modules', function (t) {
  // Fine to use in tests, izs don't stare at me that way >__<"
  rimraf.sync(__dirname + '/package_no_node_modules/node_modules');

  t.ok(fs.statSync(__dirname + '/package_no_node_modules').isDirectory());
  t.throws(function(){
    fs.statSync(__dirname + '/package_no_node_modules/node_modules');
  });

  gluttony.execute(__dirname + '/package_no_node_modules', function() {
    t.ok(fs.statSync(__dirname + '/package_no_node_modules').isDirectory());
    t.ok(fs.statSync(__dirname + '/package_no_node_modules/node_modules').isDirectory());
    t.ok(fs.statSync(__dirname + '/package_no_node_modules/node_modules/object-keys').isDirectory());
    t.ok(fs.statSync(__dirname + '/package_no_node_modules/node_modules/path').isDirectory());
    t.ok(fs.statSync(__dirname + '/package_no_node_modules/node_modules/rimraf').isDirectory());

    t.end();
  });
});
