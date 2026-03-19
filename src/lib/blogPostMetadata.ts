export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  dateIso: string;
  classification: string;
  source?: string;
  tags?: string[];
  related: string[];
  slug: string;
  content?: string;
}

interface ParsedPost {
  metadata: BlogPost;
  content: string;
}

interface NormalizedDate {
  iso: string;
  fr: string;
}

interface FrontmatterData {
  title?: string;
  date?: string;
  classification?: string;
  source?: string;
  tags?: string[];
  related?: string[];
}

const DEFAULT_CLASSIFICATION = 'CONFIDENTIEL';

export function parsePostFile(rawContent: string, filename: string): ParsedPost {
  const { data, content } = parseFrontmatter(rawContent);
  const slug = filename.replace(/\.md$/i, '');
  const fallbackTitle = slug.replace(/-/g, ' ');

  const legacyMetadata = extractLegacyMetadata(rawContent);
  const normalizedDate = normalizeDate(data.date ?? legacyMetadata.date);
  const title = data.title ?? legacyMetadata.title ?? fallbackTitle;
  const classification = data.classification ?? legacyMetadata.classification ?? DEFAULT_CLASSIFICATION;
  const source = data.source ?? legacyMetadata.source;
  const tags = data.tags;
  const related = normalizeRelated(data.related);
  const cleanedContent = stripLegacyHeader(content || rawContent).trim();
  const description = extractDescription(cleanedContent, title);
  const id = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString();

  return {
    metadata: {
      id,
      title,
      description,
      date: normalizedDate.fr,
      dateIso: normalizedDate.iso,
      classification,
      source,
      tags,
      related,
      slug,
    },
    content: cleanedContent,
  };
}

export function normalizeDate(input: unknown): NormalizedDate {
  if (typeof input !== 'string' || !input.trim()) {
    return getTodayDate();
  }

  const value = input.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return { iso: value, fr: formatIsoToFrench(value) };
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split('/');
    const iso = `${year}-${month}-${day}`;
    return { iso, fr: value };
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    const iso = parsed.toISOString().slice(0, 10);
    return { iso, fr: formatIsoToFrench(iso) };
  }

  return getTodayDate();
}

export function formatIsoToFrench(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) {
    return isoDate;
  }

  return `${day}/${month}/${year}`;
}

function getTodayDate(): NormalizedDate {
  const iso = new Date().toISOString().slice(0, 10);
  return { iso, fr: formatIsoToFrench(iso) };
}

function normalizeRelated(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim().replace(/\.md$/i, ''));
}

function extractDescription(content: string, title: string): string {
  const lines = content.split('\n');
  const paragraphs: string[] = [];
  let started = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (started && paragraphs.length > 0) {
        break;
      }
      continue;
    }

    if (/^#{1,6}\s/.test(trimmed)) {
      if (started && paragraphs.length > 0) {
        break;
      }
      started = true;
      continue;
    }

    if (/^([*-]\s|\d+\.\s|>\s|```|\|)/.test(trimmed)) {
      if (started && paragraphs.length > 0) {
        break;
      }
      continue;
    }

    started = true;
    paragraphs.push(trimmed);
  }

  if (paragraphs.length === 0) {
    return `Analyse détaillée du dossier "${title}" révélant des informations classifiées.`;
  }

  const description = paragraphs.join(' ').replace(/[*_~`]/g, '').trim();
  return description.length > 160 ? `${description.slice(0, 157)}...` : description;
}

function stripLegacyHeader(content: string): string {
  const normalized = content.replace(/\r\n/g, '\n').trimStart();

  return normalized
    .replace(/^#\s+.+\n+/, '')
    .replace(/^\n*\*\*Classification:\*\*\s+.+\n?/, '')
    .replace(/^\n*\*\*Date de déclassification:\*\*\s+.+\n?/, '')
    .replace(/^\n*\*\*Source:\*\*\s+.+\n?/, '')
    .replace(/^\n+/, '');
}

function extractLegacyMetadata(content: string): {
  title?: string;
  classification?: string;
  date?: string;
  source?: string;
} {
  const title = content.match(/^# (.+)$/m)?.[1]?.trim();
  const classification = content.match(/\*\*Classification:\*\* (.+)$/m)?.[1]?.trim();
  const date = content.match(/\*\*Date de déclassification:\*\* (.+)$/m)?.[1]?.trim();
  const source = content.match(/\*\*Source:\*\* (.+)$/m)?.[1]?.trim();

  return { title, classification, date, source };
}

function parseFrontmatter(rawContent: string): { data: FrontmatterData; content: string } {
  const normalized = rawContent.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return { data: {}, content: normalized };
  }

  const data = parseYamlLikeBlock(match[1]);
  const content = normalized.slice(match[0].length);
  return { data, content };
}

function parseYamlLikeBlock(block: string): FrontmatterData {
  const data: FrontmatterData = {};
  const lines = block.split('\n');
  let currentArrayKey: 'tags' | 'related' | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      currentArrayKey = null;
      continue;
    }

    if (trimmed.startsWith('- ') && currentArrayKey) {
      const value = unquote(trimmed.slice(2).trim());
      if (!data[currentArrayKey]) {
        data[currentArrayKey] = [];
      }
      data[currentArrayKey]!.push(value);
      continue;
    }

    currentArrayKey = null;

    const [rawKey, ...rest] = line.split(':');
    if (rest.length === 0) {
      continue;
    }

    const key = rawKey.trim();
    const value = rest.join(':').trim();

    if (key === 'tags' || key === 'related') {
      if (!value) {
        currentArrayKey = key;
        data[key] = [];
        continue;
      }

      data[key] = parseInlineArray(value);
      continue;
    }

    if (key === 'title' || key === 'date' || key === 'classification' || key === 'source') {
      data[key] = unquote(value);
    }
  }

  return data;
}

function parseInlineArray(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    return [unquote(trimmed)].filter(Boolean);
  }

  const inner = trimmed.slice(1, -1).trim();
  if (!inner) {
    return [];
  }

  return inner
    .split(',')
    .map((item) => unquote(item.trim()))
    .filter(Boolean);
}

function unquote(value: string): string {
  return value.replace(/^['"]|['"]$/g, '').trim();
}
