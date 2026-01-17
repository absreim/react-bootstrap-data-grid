import { FC } from "react";
import hljs from "highlight.js/lib/core";
import scss from "highlight.js/lib/languages/scss";

hljs.registerLanguage("scss", scss);

interface Props {
  code: string;
}

const HighlightedTsCodeBlock: FC<Props> = ({ code }) => {
  const highlightedCode = hljs.highlight(code, {
    language: "scss",
  }).value;

  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
};

export default HighlightedTsCodeBlock;
