'use strict';

const pjson = require('pjson'),
       keys = Object.keys || require('object-keys');

console.log(__dirname);
console.log(keys(pjson.dependencies));
