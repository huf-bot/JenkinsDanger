'use strict';

const _ = require('underscore');

// Add a CHANGELOG entry for app changes

const hasChangelog = _.contains(danger.git.modified_files, "CHANGELOG.md")
const isTrivial = _.contains((danger.github.pr.body + danger.github.pr.title), "#trivial")


if (!hasChangelog && !isTrivial) {
  warn("Please add a changelog entry for your changes.")
}
