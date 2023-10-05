import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const out = [];
let reg = /---(.*?)---/gs;
function readAll(parentPath) {
  const files = fs.readdirSync(parentPath);
  files.map((item) => {
    let tempPath = path.join(parentPath, item);
    let stats = fs.statSync(tempPath);
    if (stats.isDirectory()) {
      readAll(tempPath);
    } else {
      const content = fs.readFileSync(tempPath, 'utf8');
      let head = reg.exec(content);
      reg.lastIndex = 0;
      if (head) {
        let docs = yaml.load(head[1]); // 通过yaml转换成对象
        const _dirs = tempPath.split('/');
        docs.link = `/${_dirs.pop(0).slice(0, -3)}`; // 这里是为了文章列表的跳转
        docs.userName = '前端大湿兄';
        docs.tags = docs.tags.split(',');
        out.push(docs);
      }
    }
  });
}
readAll('./docs/s');

const filePath = 'docs/.vitepress/docs.json';
fs.writeFileSync(filePath, JSON.stringify(out), {
  encoding: 'utf8'
});
