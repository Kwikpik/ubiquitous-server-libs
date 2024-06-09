export type OptionalKeysMapper<T> = {
  [Property in keyof T]?: T[Property];
};

export type ExcludeFuctionsMapper<T> = {
  [Property in keyof T]: T[Property] extends (...args: any[]) => any ? undefined : T[Property];
};
