import { createContentLoader } from 'vitepress';

export default createContentLoader('全部文档/**/*.md', {
  excerpt: true, // include excerpt?
  transform(rawData) {
    // map, sort, or filter the raw data as you wish.
    // the final result is what will be shipped to the client.
    return rawData.map(({ url, frontmatter, excerpt }) => ({
      title: frontmatter.title,
      link: `article/${url.split('/').pop()}`,
      category: frontmatter.category,
      excerpt,
      preview: frontmatter.preview,
      tags: frontmatter.tags && frontmatter.tags.length ? frontmatter.tags.split(',') : [],
      date: frontmatter.date,
      intro: frontmatter.intro,
      userName: frontmatter.userName || '大湿兄'
    })).sort((a, b) => {
      return +new Date(b.date) - +new Date(a.date);
    });
  }
});