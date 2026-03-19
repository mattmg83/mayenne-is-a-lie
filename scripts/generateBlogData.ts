import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BlogPost, parsePostFile } from '../src/lib/blogPostMetadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateBlogPosts(): BlogPost[] {
  const postsDir = path.join(__dirname, '../src/content/posts');
  const posts: BlogPost[] = [];

  try {
    if (!fs.existsSync(postsDir)) {
      console.warn('Posts directory not found:', postsDir);
      return [];
    }

    const files = fs.readdirSync(postsDir);

    for (const file of files) {
      if (!file.endsWith('.md')) {
        continue;
      }

      try {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { metadata } = parsePostFile(content, file);
        posts.push(metadata);
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }

    posts.sort((a, b) => b.dateIso.localeCompare(a.dateIso));

    posts.forEach((post, index) => {
      post.id = (index + 1).toString();
    });

    return posts;
  } catch (error) {
    console.error('Error scanning posts directory:', error);
    return [];
  }
}

const blogPosts = generateBlogPosts();
const outputPath = path.join(__dirname, '../src/lib/generatedBlogData.json');
const libDir = path.dirname(outputPath);

if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(blogPosts, null, 2));
console.log(`Generated blog data for ${blogPosts.length} posts`);
