import prism from "prismjs";

export const highlighter = (code: string) => {
    return prism.highlight(code, prism.languages.js, 'js');
  };