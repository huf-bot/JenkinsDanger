'use strict';

const fs = require('fs');

const _ = require('underscore');

function untouchedChangelog() {
  const hasChangelog = _.contains(danger.git.modified_files, "CHANGELOG.md")
  const isTrivial = _.contains((danger.github.pr.body + danger.github.pr.title), "#trivial")


  if (!hasChangelog && !isTrivial) {
    warn('Your CHANGELOG.md seems to be untouched. Please make sure to add an entry if you touch code');
  }
}

function incrementedVersionWithoutChangelog() {
  const project = require('./package.json');
  const version = new RegExp(project.version, 'g');

  try {
    const changelog = fs.readFile('CHANGELOG.md', 'utf8');
    if (!version.test(changelog)) {
      error('Looks like you tried to create a version without a changelog entry. You culprit!');
    }
  } catch (err) {

  }
}

untouchedChangelog();
incrementedVersionWithoutChangelog();
