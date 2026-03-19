import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

type FrontmatterData = {
  title?: string;
  date?: string;
  classification?: string;
  source?: string;
  tags?: string[];
  related?: string[];
};

type Enrichment = {
  tags: string[];
  related: string[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsDir = path.join(__dirname, '../src/content/posts');

const LEGACY_ENRICHMENTS: Record<string, Enrichment> = {
  'afcon-2026': {
    tags: ['football', 'sport', 'géopolitique', 'manipulation'],
    related: ['le-tour-de-france', 'ormuz', 'jul-mayenne-silence'],
  },
  'analyse-economique': {
    tags: ['économie', 'budget', 'entreprises', 'finance'],
    related: ['la-dette-souveraine', 'recensement-impossible', 'assurances-sans-sinistres'],
  },
  'analyse-satellitaire': {
    tags: ['satellite', 'cartographie', 'géographie', 'surveillance'],
    related: ['cartes-falsifiees', 'reseaux-electriques-sans-consommation', 'evidence-archeologique'],
  },
  'anomalies-transport': {
    tags: ['transport', 'infrastructure', 'ferroviaire', 'logistique'],
    related: ['le-tgv-paris-rennes', 'livraisons-qui-narrivent-jamais', 'reseaux-electriques-sans-consommation'],
  },
  'cartes-falsifiees': {
    tags: ['cartographie', 'gps', 'géographie', 'falsification'],
    related: ['analyse-satellitaire', 'documents-historiques', 'evidence-archeologique'],
  },
  'controleurs-aeriens-mayenne': {
    tags: ['aviation', 'contrôle aérien', 'radar', 'espace aérien'],
    related: ['anomalies-transport', 'le-tgv-paris-rennes', 'numeros-de-telephone-injoignables'],
  },
  'documents-historiques': {
    tags: ['archives', 'histoire', 'documentation', 'mémoire'],
    related: ['evidence-archeologique', 'analyse-linguistique', 'recensement-impossible'],
  },
  'empreinte-digitale': {
    tags: ['numérique', 'data', 'internet', 'traçabilité'],
    related: ['assistants-vocaux-refusent-de-repondre', 'numeros-de-telephone-injoignables', 'logiciels-collision-americains'],
  },
  'ensemencement-nuages-mayenne': {
    tags: ['météo', 'climat', 'aviation', 'camouflage'],
    related: ['controleurs-aeriens-mayenne', 'analyse-satellitaire', 'anomalies-transport'],
  },
  'evidence-archeologique': {
    tags: ['archéologie', 'histoire', 'fouilles', 'patrimoine'],
    related: ['documents-historiques', 'analyse-satellitaire', 'la-flamme-du-soldat-inconnu'],
  },
  'illuminati-connection': {
    tags: ['sociétés secrètes', 'élite', 'influence', 'géopolitique'],
    related: ['mk-mayenne', 'ormuz', 'la-dette-souveraine'],
  },
  'jul-mayenne-silence': {
    tags: ['musique', 'rap', 'culture', 'censure'],
    related: ['le-festival-de-laval', 'afcon-2026', 'assistants-vocaux-refusent-de-repondre'],
  },
  'la-dette-souveraine': {
    tags: ['économie', 'finance', 'dette', 'souveraineté'],
    related: ['analyse-economique', 'ormuz', 'recensement-impossible'],
  },
  'la-flamme-du-soldat-inconnu': {
    tags: ['mémoire', 'histoire', 'symboles', 'armée'],
    related: ['evidence-archeologique', 'documents-historiques', 'temoins-oculaires'],
  },
  'le-festival-de-laval': {
    tags: ['culture', 'festival', 'événement', 'médias'],
    related: ['photos-de-mariage-generees', 'jul-mayenne-silence', 'reseaux-electriques-sans-consommation'],
  },
  'le-tgv-paris-rennes': {
    tags: ['transport', 'ferroviaire', 'mobilité', 'infrastructure'],
    related: ['anomalies-transport', 'livraisons-qui-narrivent-jamais', 'controleurs-aeriens-mayenne'],
  },
  'le-tour-de-france': {
    tags: ['sport', 'cyclisme', 'logistique', 'événement'],
    related: ['afcon-2026', 'anomalies-transport', 'le-festival-de-laval'],
  },
  'les-roux-conspiration': {
    tags: ['génétique', 'population', 'biologie', 'anomalie'],
    related: ['recensement-impossible', 'temoins-oculaires', 'mk-mayenne'],
  },
  'logiciels-collision-americains': {
    tags: ['logiciels', 'collision', 'algorithmes', 'numérique'],
    related: ['assurances-sans-sinistres', 'empreinte-digitale', 'assistants-vocaux-refusent-de-repondre'],
  },
  'mk-mayenne': {
    tags: ['expérimentation', 'psychologie', 'contrôle mental', 'simulation'],
    related: ['temoins-oculaires', 'empreinte-digitale', 'illuminati-connection'],
  },
  ormuz: {
    tags: ['géopolitique', 'énergie', 'maritime', 'commerce'],
    related: ['la-dette-souveraine', 'afcon-2026', 'illuminati-connection'],
  },
  'temoins-oculaires': {
    tags: ['témoignages', 'mémoire', 'psychologie', 'habitants'],
    related: ['mk-mayenne', 'photos-de-mariage-generees', 'les-roux-conspiration'],
  },
};

function collectMarkdownFiles(directory: string): string[] {
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

function parseFrontmatter(rawContent: string): { data: FrontmatterData; body: string; hasFrontmatter: boolean } {
  const normalized = rawContent.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return { data: {}, body: normalized, hasFrontmatter: false };
  }

  return {
    data: parseYamlLikeBlock(match[1]),
    body: normalized.slice(match[0].length),
    hasFrontmatter: true,
  };
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
      } else {
        data[key] = parseInlineArray(value);
      }
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

function extractLegacyMetadata(content: string): FrontmatterData {
  const normalized = content.replace(/\r\n/g, '\n');

  return {
    title: normalized.match(/^#\s+(.+)$/m)?.[1]?.trim(),
    classification: normalized.match(/\*\*Classification:\*\*\s+(.+)$/m)?.[1]?.trim(),
    date: normalized.match(/\*\*Date de déclassification:\*\*\s+(.+)$/m)?.[1]?.trim(),
    source: normalized.match(/\*\*Source:\*\*\s+(.+)$/m)?.[1]?.trim(),
  };
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

function normalizeIsoDate(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const legacyMatch = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (legacyMatch) {
    const [, day, month, year] = legacyMatch;
    return `${year}-${month}-${day}`;
  }

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return undefined;
}

function normalizeStringArray(value: string[] | undefined): string[] {
  return (value ?? []).map((item) => item.trim()).filter(Boolean);
}

function normalizeRelated(value: string[] | undefined): string[] {
  return normalizeStringArray(value).map((item) => item.replace(/\.md$/i, ''));
}

function quote(value: string): string {
  return `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;
}

function serializeFrontmatter(data: Required<FrontmatterData>): string {
  const lines = [
    '---',
    `title: ${quote(data.title)}`,
    `date: ${quote(data.date)}`,
    `classification: ${quote(data.classification)}`,
    `source: ${quote(data.source)}`,
    'tags:',
    ...data.tags.map((tag) => `  - ${quote(tag)}`),
    'related:',
    ...data.related.map((slug) => `  - ${quote(slug)}`),
    '---',
    '',
  ];

  return lines.join('\n');
}

function main(): void {
  const markdownFiles = collectMarkdownFiles(postsDir);
  const manualReview: string[] = [];
  let rewritten = 0;

  for (const filePath of markdownFiles) {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, body, hasFrontmatter } = parseFrontmatter(rawContent);
    const slug = path.basename(filePath, '.md');

    let normalized: FrontmatterData = {
      title: data.title,
      date: normalizeIsoDate(data.date),
      classification: data.classification,
      source: data.source,
      tags: normalizeStringArray(data.tags),
      related: normalizeRelated(data.related),
    };

    let normalizedBody = body.trim();

    if (!hasFrontmatter) {
      const legacy = extractLegacyMetadata(rawContent);
      const enrichment = LEGACY_ENRICHMENTS[slug];
      normalized = {
        title: legacy.title,
        date: normalizeIsoDate(legacy.date),
        classification: legacy.classification,
        source: legacy.source,
        tags: enrichment?.tags ?? [],
        related: enrichment?.related ?? [],
      };
      normalizedBody = stripLegacyHeader(rawContent).trim();

      if (!enrichment) {
        manualReview.push(`${slug}: missing enrichment map entry`);
      }
    }

    if (/^#\s+.+$/m.test(normalizedBody.split('\n').slice(0, 4).join('\n'))) {
      manualReview.push(`${slug}: body still starts with a markdown title after migration`);
    }

    if (/\*\*Classification:\*\*|\*\*Date de déclassification:\*\*|\*\*Source:\*\*/.test(normalizedBody)) {
      manualReview.push(`${slug}: legacy metadata remains in body`);
    }

    const missingFields = Object.entries({
      title: normalized.title,
      date: normalized.date,
      classification: normalized.classification,
      source: normalized.source,
    })
      .filter(([, value]) => typeof value !== 'string' || !value.trim())
      .map(([key]) => key);

    if (missingFields.length > 0) {
      manualReview.push(`${slug}: missing required fields ${missingFields.join(', ')}`);
      continue;
    }

    const standardizedFrontmatter = serializeFrontmatter({
      title: normalized.title!,
      date: normalized.date!,
      classification: normalized.classification!,
      source: normalized.source!,
      tags: normalized.tags ?? [],
      related: normalized.related ?? [],
    });

    const nextContent = `${standardizedFrontmatter}${normalizedBody}\n`;
    if (nextContent !== rawContent.replace(/\r\n/g, '\n')) {
      fs.writeFileSync(filePath, nextContent);
      rewritten += 1;
    }
  }

  console.log(`Rewrote ${rewritten} markdown files.`);
  if (manualReview.length === 0) {
    console.log('Manual review: none.');
    return;
  }

  console.log('Manual review required for:');
  for (const item of manualReview) {
    console.log(`- ${item}`);
  }
  process.exitCode = 1;
}

function unquote(value: string): string {
  let normalized = value.replace(/^['"]|['"]$/g, '').trim();

  while (/\\[\\"]/.test(normalized)) {
    normalized = normalized.replace(/\\([\\"])/g, '$1');
  }

  return normalized;
}

main();
