/* eslint-disable no-unused-vars */
export const filterArr = (arr: any[], condition: (e: any) => boolean) =>
  arr.filter(condition)

export const mapArr = (arr: any[], mapping: (e: any) => any) => arr.map(mapping)
