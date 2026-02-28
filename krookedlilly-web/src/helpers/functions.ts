/**
 * Checks if a string is undefined, null, or empty
 */
export function isStringEmpty(str: string | undefined | null) {
  return str === undefined || str === null || str === "";
}

export function ObjToQueryString(params: any = {}): string {
  return Object.keys(params).filter((key) => params[key] !== null &&
    ((typeof params[key] === 'string' && params[key].length > 0) || typeof params[key] === 'number' || typeof params[key] === 'boolean'))
    .map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&');
}