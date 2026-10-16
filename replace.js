const fs = require('fs');
const path = require('path');
const dirs = ['src/pages', 'src/components', 'src'];
const traverse = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) traverse(fullPath);
    else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/color:\s*'var\(--color-primary\)'/g, \color: '#f8fafc'\);
      fs.writeFileSync(fullPath, content);
    }
  });
};
traverse('src');
console.log('Fixed primary text colors for dark theme.');

