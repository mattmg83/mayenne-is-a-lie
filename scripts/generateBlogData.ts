import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BlogPost, parsePostFile } from '../src/lib/blogPostMetadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../src/content/posts');
const outputPath = path.join(__dirname, '../src/lib/generatedBlogData.json');

function collectMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    throw new Error(`Posts directory not found: ${directory}`);
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectMarkdownFiles(entryPath);
      }

      return entry.isFile() && entry.name.endsWith('.md') ? [entryPath] : [];
    })
    .sort((a, b) => a.localeCompare(b));
}

function validatePost(post: BlogPost, filePath: string, knownSlugs: Set<string>): void {
  const requiredFields: Array<keyof Pick<BlogPost, 'title' | 'date' | 'classification'>> = [
    'title',
    'date',
    'classification',
  ];

  for (const field of requiredFields) {
    const value = post[field];
    if (typeof value !== 'string' || !value.trim()) {
      throw new Error(`Missing required field "${field}" after normalization for ${filePath}`);
    }
  }

  for (const relatedSlug of post.related) {
    if (!knownSlugs.has(relatedSlug)) {
      throw new Error(`Post ${filePath} references unknown related slug "${relatedSlug}"`);
    }
  }
}

function assertGeneratedEntryCount(markdownFileCount: number, generatedEntryCount: number): void {
  if (markdownFileCount !== generatedEntryCount) {
    throw new Error(
      `Generated post count mismatch: found ${markdownFileCount} markdown files but ${generatedEntryCount} generated entries`,
    );
  }
}

function generateBlogPosts(): { markdownFileCount: number; posts: BlogPost[] } {
  const markdownFiles = collectMarkdownFiles(postsDir);
  const parsedPosts = markdownFiles.map((filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(postsDir, filePath);
    const { metadata } = parsePostFile(content, relativePath);
    return metadata;
  });

  const slugToFile = new Map<string, string>();

  for (const [index, post] of parsedPosts.entries()) {
    const duplicateSource = slugToFile.get(post.slug);
    const currentFile = markdownFiles[index];

    if (duplicateSource) {
      throw new Error(`Duplicate slug "${post.slug}" found in ${duplicateSource} and ${currentFile}`);
    }

    slugToFile.set(post.slug, currentFile);
  }

  const knownSlugs = new Set(parsedPosts.map((post) => post.slug));
  parsedPosts.forEach((post, index) => validatePost(post, markdownFiles[index], knownSlugs));

  const posts = parsedPosts
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso))
    .map((post, index) => ({
      ...post,
      id: (index + 1).toString(),
    }));

  assertGeneratedEntryCount(markdownFiles.length, posts.length);

  return {
    markdownFileCount: markdownFiles.length,
    posts,
  };
}

function writeGeneratedBlogData(posts: BlogPost[]): void {
  const libDir = path.dirname(outputPath);

  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, `${JSON.stringify(posts, null, 2)}\n`);
}

function verifyGeneratedFileCount(markdownFileCount: number): void {
  const generatedPosts = JSON.parse(fs.readFileSync(outputPath, 'utf-8')) as unknown;

  if (!Array.isArray(generatedPosts)) {
    throw new Error(`Generated blog data is not an array: ${outputPath}`);
  }

  assertGeneratedEntryCount(markdownFileCount, generatedPosts.length);
}

function main(): void {
  const { markdownFileCount, posts } = generateBlogPosts();
  writeGeneratedBlogData(posts);
  verifyGeneratedFileCount(markdownFileCount);
  console.log(`Generated blog data for ${posts.length} posts`);
}

main();
