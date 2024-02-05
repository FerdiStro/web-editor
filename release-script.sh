#!/bin/bash

#!/bin/bash

CURRENT_VERSION=$(node -p -e "require('./package.json').version")

NEW_VERSION=$(semver $CURRENT_VERSION -i patch)


if [ "$NEW_VERSION" != "$CURRENT_VERSION" ]; then
  npm version $NEW_VERSION

  git add package.json
  git commit -m "Release $NEW_VERSION"
  git push origin main
else
  echo "No changes in version. Skipping commit and push."
fi
