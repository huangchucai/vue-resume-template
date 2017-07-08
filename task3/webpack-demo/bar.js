export function format(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace()
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  Object.keys(o).forEach((item) => {
    if (new RegExp(`(${item})`).test(fmt)) {
      var str = o[item] + '';
      fmt = fmt.replace(RegExp.$1, addZero(str))
    }
  })
  return fmt;
  function addZero(str) {
    return ('00' + str).substr(str.length);
  }
}

