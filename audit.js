import fs from "fs/promises";
import path from "path";
import postcss from "postcss";
import parser from "postcss-selector-parser";
import { Command } from "commander";

const program = new Command();

program
  .name("css-auditor")
  .description("Extract classes and IDs from a stylesheet for auditing")
  .version("1.0.0")
  .argument("<input>", "Path to the source CSS file")
  .option("-o, --output <path>", "Output text file path", "selectors-audit.txt")
  .action(async (input, options) => {
    try {
      const cssPath = path.resolve(input);
      const css = await fs.readFile(cssPath, "utf8");

      const selectors = new Set();

      const processor = postcss([
        {
          postcssPlugin: "selector-extractor",
          Rule(rule) {
            parser((selectorsRoot) => {
              selectorsRoot.walk((node) => {
                if (node.type === "class") {
                  selectors.add(`.${node.value}`);
                } else if (node.type === "id") {
                  selectors.add(`#${node.value}`);
                }
              });
            }).processSync(rule.selector);
          },
        },
      ]);

      await processor.process(css, { from: cssPath });

      const outputData = Array.from(selectors).sort().join("\n");

      await fs.writeFile(options.output, outputData, "utf8");

      console.log(`Successfully audited ${selectors.size} unique selectors.`);
      console.log(`Results saved to: ${options.output}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse();

