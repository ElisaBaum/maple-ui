import * as requireHacker from 'require-hacker';
import * as fs from 'fs';

const extensions = [
  {type: 'html', isReadable: true},
  {type: 'scss', isReadable: false},
  {type: 'css', isReadable: false},
  {type: 'png', isReadable: false},
  {type: 'svg', isReadable: false},
];

extensions.forEach(({type, isReadable}) =>
  requireHacker.hook(type, path =>
    isReadable
      ? `module.exports = "${fs.readFileSync(path).toString().replace(/"/g, '\\"').replace(/\n/g, '')}";`
      : `module.exports = "";`
  )
);
