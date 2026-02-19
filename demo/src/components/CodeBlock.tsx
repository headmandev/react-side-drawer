import { useEffect, useRef } from 'react';
import { highlighter } from '../utils/highlighter';

export function CodeBlock({ code }: { code: string }) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      const html = highlighter(code);
      preRef.current.querySelector('code')!.innerHTML = html;
    }
  }, [code]);

  return (
    <pre ref={preRef} className="code-block">
      <code className="language-js">{code}</code>
    </pre>
  );
}
