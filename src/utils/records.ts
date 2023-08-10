/** 对记录按照键名解包*/
export const unpack = (rows: { [k: string]: any }[], key: string): any[] => {
  return rows.map((row: { [k: string]: any }) => {
    return row[key]
  })
}
