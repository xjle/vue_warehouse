// 排序函数
export function getSortFun(order, sortBy, multipleSort) {
  let ordAlpah = order.indexOf('asc') >= 0 ? '>' : '<'
  const sortFun = new Function(
    'a',
    'b',
    `const reg = /<[^>]+>/g;
    const multipleSort = ${JSON.stringify(multipleSort)};
    let new_a = a.${sortBy};
    let new_b = b.${sortBy};
    if (new_a === new_b && multipleSort && multipleSort.sortBy) {
      new_a = multipleSort.order.indexOf('asc') >= 0 ? a[multipleSort.sortBy] : b[multipleSort.sortBy];
      new_b = multipleSort.order.indexOf('asc') >= 0 ? b[multipleSort.sortBy] : a[multipleSort.sortBy];
    }
    if (parseFloat(new_a) !== "NaN" && parseFloat(new_b) !== "NaN"  && (!isNaN(new_a) || new_a.indexOf('%') >= 0)) { 
      return parseFloat(new_a)${ordAlpah}parseFloat(new_b) ? 1: -1 
    } else if (reg.test(new_a) && reg.test(new_b)) { 
      let a_text = $(new_a).text().trim()
      let b_text = $(new_b).text().trim()
      if (!isNaN(parseFloat(a_text)) && !isNaN(parseFloat(b_text))) {
        return parseFloat(a_text)${ordAlpah}parseFloat(b_text) ? 1: -1 
      } else {
        return '${ordAlpah}' === '>' ? a_text.localeCompare(b_text) : b_text.localeCompare(a_text)
      }
    } else {
      return '${ordAlpah}' === '>' ? new_a.toString().localeCompare(new_b.toString()) : new_b.toString().localeCompare(new_a.toString())
    }`,
  )
  // const sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1')
  return sortFun
}