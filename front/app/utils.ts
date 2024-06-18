export function isFullWidth(char: string) {
  return char.match(/[^\x00-\xff]/);
}

export function truncateString(str: string, maxLength: number) {
  let length = 0;
  let truncated = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    length += isFullWidth(char) ? 2 : 1;
    if (length > maxLength) {
      truncated += '...';
      break;
    }
    truncated += char;
  }

  return truncated;
}
