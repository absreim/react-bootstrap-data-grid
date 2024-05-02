import { FC } from "react";
import hljs from "highlight.js/lib/core"
import typescript from "highlight.js/lib/languages/typescript"

hljs.registerLanguage("typescript", typescript)

const sampleCodeText = `
import Grid from "@absreim/react-bootstrap-data-grid";
import { FC } from "react";

const cols: ColDef[] = [
  {
    type: "string",
    name: "name",
    label: "Name"
  },
  {
    type: "string",
    name: "race",
    label: "Race"
  },
  {
    type: "string",
    name: "class",
    label: "Class"
  }
]

const rows: RowDef[] = [
  {
    name: "The Dark Urge",
    race: "Dragonborn",
    class: "Sorcerer"
  },
  {
    name: "Lae'zel",
    race: "Githyanki",
    class: "Fighter"
  },
  {
    name: "Shadowheart",
    race: "Half-elf",
    class: "Cleric"
  },
  {
    name: "Astarion",
    race: "Elf",
    class: "Rogue"
  },
  {
    name: "Gale",
    race: "Human",
    class: "Wizard"
  },
  {
    name: "Wyll",
    race: "Human",
    class: "Warlock"
  },
  {
    name: "Karlach",
    race: "Tiefling",
    class: "Barbarian"
  }
]

const BasicGridExample: FC = () => {
  return (
    <Grid rows={rows} cols={cols} />
  );
};`;

const BasicSampleGridCode: FC = () => {
  const highlightedCode = hljs.highlight(sampleCodeText, { language: "typescript" }).value

  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  )
}

export default BasicSampleGridCode;
