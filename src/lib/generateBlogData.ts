import fs from 'fs';
import path from 'path';

// Blog post metadata interface
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  classification: string;
  slug: string;
}

/**
 * Parse metadata from a markdown file content
 * @param content The markdown file content
 * @param filename The filename (used for slug generation)
 * @returns Parsed blog post metadata
 */
function parseMarkdownMetadata(content: string, filename: string): BlogPost {
  // Extract title from first line (H1)
  const titleMatch = content.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : filename.replace('.md', '').replace(/-/g, ' ');

  // Extract classification
  const classificationMatch = content.match(/\*\*Classification:\*\* (.+)$/m);
  const classification = classificationMatch ? classificationMatch[1] : 'CONFIDENTIEL';

  // Extract date
  const dateMatch = content.match(/\*\*Date de déclassification:\*\* (.+)$/m);
  const date = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('fr-FR');

  // Generate description from the first paragraph after the metadata
  let description = '';
  const contentLines = content.split('\n');
  let inMetadata = true;
  const paragraphs: string[] = [];
  
  for (const line of contentLines) {
    // Skip empty lines during metadata section
    if (inMetadata && line.trim() === '') {
      continue;
    }
    
    // Check if we're done with metadata
    if (inMetadata && line.startsWith('## ')) {
      inMetadata = false;
      continue;
    }
    
    // If we're past metadata and find content, collect paragraphs
    if (!inMetadata) {
      if (line.startsWith('## ')) {
        break; // Stop at the next section
      }
      if (line.trim() !== '' && !line.startsWith('**')) {
        paragraphs.push(line);
      }
    }
  }
  
  // Use the first paragraph as description, or generate one if none found
  if (paragraphs.length > 0) {
    description = paragraphs[0].replace(/[*_~`]/g, '').trim();
    // Limit description length
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }
  } else {
    description = `Analyse détaillée du dossier "${title}" révélant des informations classifiées.`;
  }

  // Generate slug from filename
  const slug = filename.replace('.md', '');

  // Generate ID based on slug
  const id = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString();

  return {
    id,
    title,
    description,
    date,
    classification,
    slug
  };
}

/**
 * Scan the content/posts directory and generate blog post metadata
 * @returns Array of blog post metadata
 */
export function generateBlogPosts(): BlogPost[] {
  const postsDir = path.join(__dirname, '../content/posts');
  const posts: BlogPost[] = [];
  
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDir)) {
      console.warn('Posts directory not found:', postsDir);
      return [];
    }
    
    // Read all files in the directory
    const files = fs.readdirSync(postsDir);
    
    // Process each markdown file
    for (const file of files) {
      if (file.endsWith('.md')) {
        try {
          const filePath = path.join(postsDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const post = parseMarkdownMetadata(content, file);
          posts.push(post);
        } catch (error) {
          console.error(`Error processing file ${file}:`, error);
        }
      }
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => {
      const dateA = parseFrenchDate(a.date);
      const dateB = parseFrenchDate(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    
    // Add sequential IDs
    posts.forEach((post, index) => {
      post.id = (index + 1).toString();
    });
    
    return posts;
  } catch (error) {
    console.error('Error scanning posts directory:', error);
    return [];
  }
}

/**
 * Parse French date format (DD/MM/YYYY) to Date object
 * @param dateStr French date string
 * @returns Date object
 */
function parseFrenchDate(dateStr: string): Date {
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    // Convert DD/MM/YYYY to MM/DD/YYYY for Date constructor
    return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
  }
  return new Date();
}

// Export the generated blog posts
export const blogPosts = generateBlogPosts();