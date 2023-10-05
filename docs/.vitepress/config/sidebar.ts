import interviewRouter from '../router/interview.js'

function addCollapsible(data: any) {
  data.forEach(item => {
    if (item?.items?.length) {
      item.collapsible = true
      item.collapsed = true
      if (Array.isArray(item.items) && item.items.length) {
        addCollapsible(item.items)
      }
    }
  })

  return data
}

export default {
  /**展示sidebar要匹配上 */
  '/interview-question/': addCollapsible(interviewRouter)
}