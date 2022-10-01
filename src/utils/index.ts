/**
 * 从 localstorage 中读取指定的数据
 * @param {string} 想要从 localstorage 中读取的 key
 * @return {string | null} 找到的值
 */
export function localGet(key: string) {
  const value = localStorage.getItem(key);
  try {
    // @ts-ignore
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}
