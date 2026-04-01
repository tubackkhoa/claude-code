import * as fs from 'fs';
import * as path from 'path';

function walkDir(dir: string, callback: (filePath: string) => void) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

function processFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');

  const marker = '//# sourceMappingURL=data:application/json';
  const index = content.lastIndexOf(marker);

  if (index === -1) return;

  try {
    const lineEnd = content.indexOf('\n', index);
    const line = content.slice(index, lineEnd === -1 ? undefined : lineEnd);

    const base64Prefix = 'base64,';
    const base64Index = line.indexOf(base64Prefix);

    if (base64Index === -1) {
      console.warn(`⚠ No base64 found in: ${filePath}`);
      return;
    }

    const base64 = line.slice(base64Index + base64Prefix.length).trim();
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    const sourceMap = JSON.parse(decoded);

    if (sourceMap.sourcesContent && sourceMap.sourcesContent.length > 0) {
      const originalSource = sourceMap.sourcesContent[0];
      fs.writeFileSync(filePath, originalSource, 'utf-8');
      console.log(`✔ Replaced: ${filePath}`);
    } else {
      console.warn(`⚠ No sourcesContent in: ${filePath}`);
    }
  } catch (err) {
    console.error(`✖ Error processing ${filePath}:`, err);
  }
}

function processFolder(folderPath: string) {
  const validExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);

  walkDir(folderPath, (filePath) => {
    const ext = path.extname(filePath).toLowerCase();

    if (validExtensions.has(ext)) {
      processFile(filePath);
    }
  });
}

// ---- RUN ----
const targetFolder = process.argv[2];

if (!targetFolder) {
  console.error('Usage: ts-node script.ts <folder>');
  process.exit(1);
}

processFolder(path.resolve(targetFolder));
