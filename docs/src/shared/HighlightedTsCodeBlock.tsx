import { FC } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("typescript", typescript);

interface Props {
  code: string;
}

const HighlightedTsCodeBlock: FC<Props> = ({ code }) => {
  const highlightedCode = hljs.highlight(code, {
    language: "typescript",
  }).value;

  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
};

export default HighlightedTsCodeBlock;
