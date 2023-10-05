import docData from './docs.json';

export function useDocs() {
  // 时间倒序显示
  docData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const categories = {}; //所有的文章分类
  let tags = new Set(); //所有的文章标签
  let docNum = 0,
    tagNum = 0; //文章总数、标签总数
  docData.map((item) => {
    docNum++;
    if (item.tags) {
      tags = new Set([...item.tags])
    }
  });
  tagNum = tags.size;

  return {
    /**
     * docData: 包含所有的文章信息
     * categories: 所有分类
     * tags: 所有标签
     * docNum: 文章总数
     * tagNum: 标签总数
     */
    docData,
    categories,
    tags,
    docNum,
  };
}
