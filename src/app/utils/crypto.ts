/**
 * @source https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 */
export const toBase64 = (value: string) =>
  btoa(encodeURIComponent(value).replace(
    /%([0-9A-F]{2})/g,
    (match, p1) => String.fromCharCode(('0x' + p1) as any)
  ));
