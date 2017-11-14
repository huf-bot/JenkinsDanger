// Add a CHANGELOG entry for app changes
const hasChangelog = includes(danger.git.modified_files, "changelog.md")
const isTrivial = contains((danger.github.pr.body + danger.github.pr.title), "#trivial")

if (!hasChangelog && !isTrivial) {
  warn("Please add a changelog entry for your changes.")
}

