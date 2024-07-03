export const formatLocaleDate = (dateStr: string, formatStr: string = 'yyyy-MM-dd hh:mm') => {
  const date: any = new Date(dateStr);

  if (isNaN(date)) { // 如果传的不是时间字符串，则直接返回原值
    return dateStr;
  }

  const z: any = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };
  formatStr = formatStr.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
    return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
  });

  return formatStr.replace(/(y+)/g, function (v) {
    return date.getFullYear().toString().slice(-v.length)
  });
}