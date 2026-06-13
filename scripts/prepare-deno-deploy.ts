const root = new URL("../", import.meta.url);
const dist = new URL("../dist/", import.meta.url);

const requiredFiles = [
  "index.html",
  "nos-solutions.html",
  "a-propos.html",
  "contact.html",
  "avis-juridique.html",
  "politique-de-confidentialite.html",
  "404.html",
  "css/brutalist.css",
  "js/main.js",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
];

const optionalFiles = ["cached-bundle.js"];
const requiredDirs = ["images", "videos"];

async function exists(path: URL): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return false;
    throw error;
  }
}

async function copyFile(
  relativePath: string,
  optional = false,
): Promise<boolean> {
  const source = new URL(relativePath, root);
  const target = new URL(relativePath, dist);

  if (!(await exists(source))) {
    if (optional) return false;
    throw new Error(`Missing required deploy file: ${relativePath}`);
  }

  await Deno.mkdir(new URL("./", target), { recursive: true });
  await Deno.copyFile(source, target);
  return true;
}

async function copyDir(relativePath: string): Promise<void> {
  const source = new URL(`${relativePath}/`, root);
  const target = new URL(`${relativePath}/`, dist);

  if (!(await exists(source))) {
    throw new Error(`Missing required deploy directory: ${relativePath}`);
  }

  await Deno.mkdir(target, { recursive: true });
  for await (const entry of Deno.readDir(source)) {
    const childSource = new URL(
      entry.name + (entry.isDirectory ? "/" : ""),
      source,
    );
    const childTarget = new URL(
      entry.name + (entry.isDirectory ? "/" : ""),
      target,
    );

    if (entry.isDirectory) {
      await copyDirFromUrl(childSource, childTarget);
    } else if (entry.isFile) {
      await Deno.copyFile(childSource, childTarget);
    }
  }
}

async function copyDirFromUrl(source: URL, target: URL): Promise<void> {
  await Deno.mkdir(target, { recursive: true });
  for await (const entry of Deno.readDir(source)) {
    const childSource = new URL(
      entry.name + (entry.isDirectory ? "/" : ""),
      source,
    );
    const childTarget = new URL(
      entry.name + (entry.isDirectory ? "/" : ""),
      target,
    );

    if (entry.isDirectory) {
      await copyDirFromUrl(childSource, childTarget);
    } else if (entry.isFile) {
      await Deno.copyFile(childSource, childTarget);
    }
  }
}

if (await exists(dist)) {
  await Deno.remove(dist, { recursive: true });
}
await Deno.mkdir(dist, { recursive: true });

for (const file of requiredFiles) {
  await copyFile(file);
}

for (const file of optionalFiles) {
  const copied = await copyFile(file, true);
  if (!copied) console.warn(`Optional deploy file not found: ${file}`);
}

for (const dir of requiredDirs) {
  await copyDir(dir);
}

await copyFile("scripts/deno-server.ts");
await Deno.rename(
  new URL("scripts/deno-server.ts", dist),
  new URL("main.ts", dist),
);
await Deno.remove(new URL("scripts/", dist), { recursive: true });

console.log("Deno deploy package ready in dist/");
