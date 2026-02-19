import prism from 'prismjs';

export function highlighter(code: string): string {
  return prism.highlight(code, prism.languages.js, 'js');
}
