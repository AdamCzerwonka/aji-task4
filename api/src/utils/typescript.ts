export const pickFunc = <T extends {}, K extends keyof T>(
  obj: T,
  func: (k: string) => boolean
): Pick<T, K> =>
  Object.keys(obj)
    .filter(func)
    .reduce(
      (filtered: Pick<T, K>, key) => ({
        ...filtered,
        [key]: obj[key as keyof T],
      }),
      {} as Pick<T, K>
    );

export const pick = <T extends {}, K extends keyof T>(
  obj: T,
  keys: Array<K>
): Pick<T, K> => pickFunc(obj, (k) => keys.includes(k as K));

type TypedKeys = <T>(obj: T) => Array<keyof T>;
export const typedKeys: TypedKeys = Object.keys as any;
