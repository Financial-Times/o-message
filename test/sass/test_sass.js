let path = require('path');
const sassTrue = require('sass-true');

const sassFile = path.join(__dirname, 'mixins.test.scss');
sassTrue.runSass({file: sassFile}, describe, it);