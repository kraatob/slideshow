#/bin/sh
set -e
npx webpack
git add dist/
git diff-index --cached HEAD dist || git commit -am 'prepare for deploy'
git subtree push --prefix dist origin gh-pages
