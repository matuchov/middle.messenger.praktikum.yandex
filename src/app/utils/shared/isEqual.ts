type PlainObject<T = unknown> = Record<string, T>;

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export function isEqual(lhs: unknown, rhs: unknown): boolean {
  if (lhs === rhs) return true;

  if (typeof lhs !== typeof rhs || lhs === null || rhs === null) {
    return false;
  }

  if (isArray(lhs) && isArray(rhs)) {
    if (lhs.length !== rhs.length) return false;

    return lhs.every((value, index) => isEqual(value, rhs[index]));
  }

  if (isPlainObject(lhs) && isPlainObject(rhs)) {
    const leftKeys = Object.keys(lhs);
    const rightKeys = Object.keys(rhs);

    if (leftKeys.length !== rightKeys.length) return false;

    for (const key of leftKeys) {
      if (!Object.prototype.hasOwnProperty.call(rhs, key) || !isEqual(lhs[key], rhs[key])) {
        return false;
      }
    }
    return true;
  }

  return lhs === rhs;
}
