// 返回对象的值的联合类型
export type ValueOf<T> = T[keyof T];

const Obj = {
  Generic: { value: 0, label: '通用' },
  Meet: { value: 1, label: '肉' },
};
