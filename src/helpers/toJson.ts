export function toPlainObj(obj: object) {
  const stringy = JSON.stringify(
    obj,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
  );

  return JSON.parse(stringy);
}

export function toStringObj(obj: object) {
  return JSON.stringify(
    obj,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
  );
}
