'use strict';

const fs = require('fs');

function untouchedChangelog() {

  const changelogExp = /changelog\.md/i;
  const trivialExp = /#trivial/i;
  const hasChangelog = danger.git.modified_files.find((fileName) => {
    return changelogExp.test(fileName);
  }) !== undefined;

  const isTrivial = trivialExp.test(danger.github.pr.body + danger.github.pr.title);

  if (!hasChangelog && !isTrivial) {
    warn('Your CHANGELOG.md seems to be untouched. Please make sure to add an entry if you touch code');
  }
}

function incrementedVersionWithoutChangelog() {
  const project = require('./package.json');
  const versionChunks = project.version.split('.');
  const versionExp = new RegExp(versionChunks.join('\\.'));

  try {
    const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
    if (!versionExp.test(changelog)) {
      fail(`Looks like you tried to create a version (${project.version}) without a changelog entry. You culprit!`);
    }
  } catch (err) {
    warn('Could not find CHANGELOG.md');
  }
}

function pullRequestWorkers() {
  if (danger.github.pr.assignees.length <= 0) {
    fail("Please assign someone to merge this PR.")
  }

  if (danger.github.pr.requested_reviewers.length <= 0) {
    fail("Please assign someone to review this PR.")
  }
}

function encourageMoreTests() {
  const modifiedAppFiles = danger.git.modified_files;
  const hasAppChanges = modifiedAppFiles.length > 0;

  const testChanges = modifiedAppFiles.filter(filePath =>
    filePath.includes('test'),
  );
  const hasTestChanges = testChanges.length > 0;

  // Warn if there are library changes, but not tests
  if (hasAppChanges && !hasTestChanges) {
    warn(
      "There are library changes, but not tests. That's OK as long as you're refactoring existing code",
    );
  }
}

function smallerPullRequests() {
  const bigPRThreshold = 1337;
  if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
    warn('Pullrequest is relatively big. Consider cutting it into smaller parts');
  }
}

untouchedChangelog();
incrementedVersionWithoutChangelog();
pullRequestWorkers();
encourageMoreTests();
smallerPullRequests();
