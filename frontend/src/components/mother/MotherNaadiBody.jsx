import { docParas, isSlokaLine } from "@/lib/docContent";

function groupNaadiBlocks(paragraphs) {
  const blocks = [];
  let slokaRun = [];

  const flushSloka = () => {
    if (slokaRun.length) {
      blocks.push({ type: "sloka", lines: slokaRun });
      slokaRun = [];
    }
  };

  paragraphs.forEach((paragraph) => {
    const lines = paragraph.split("\n").map((line) => line.trim()).filter(Boolean);
    const paragraphIsSloka = lines.length > 0 && lines.every((line) => isSlokaLine(line));

    if (paragraphIsSloka) {
      slokaRun.push(...lines);
      return;
    }

    flushSloka();
    if (lines.length === 1 && isSlokaLine(lines[0])) {
      slokaRun.push(lines[0]);
      return;
    }

    blocks.push({ type: "prose", text: paragraph });
  });

  flushSloka();
  return blocks;
}

export default function MotherNaadiBody() {
  const paragraphs = docParas("mother_naadi", { minLen: 20 });
  const blocks = groupNaadiBlocks(paragraphs);

  return (
    <section className="mother-naadi-body">
      <div className="wrap mother-naadi-inner">
        {blocks.map((block, index) => {
          if (block.type === "sloka") {
            return (
              <pre key={`sloka-${index}`} className="sloka-block" lang="sa">
                {block.lines.join("\n")}
              </pre>
            );
          }
          return <p key={`p-${index}`}>{block.text}</p>;
        })}
      </div>
    </section>
  );
}
