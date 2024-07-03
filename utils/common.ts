export const isNotEmptyObj = (obj: any) => {
  return Object.keys(obj).length !== 0;
}

export const displayStock = (stock: number, hidden: boolean) => {
  if (!hidden) { return stock }
  if (stock == 0) {
    return '0'
  }
  return '>=1'
}