'use strict';

const danger = require('danger');
const warn = require('danger').warn;
const _ = require('lodash');

//console.log(danger.github.pr)
console.log(danger.git)

// Add a CHANGELOG entry for app changes
/*
const hasChangelog = _.includes(danger.git.modified_files, "changelog.md")
const isTrivial = _.contains((danger.github.pr.body + danger.github.pr.title), "#trivial")

if (!hasChangelog && !isTrivial) {
  warn("Please add a changelog entry for your changes.")
}*/
