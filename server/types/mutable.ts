/** mutable なオブジェクトへの変換 */
export type Mutable<T> = { -readonly [K in keyof T]: Mutable<T[K]> };
