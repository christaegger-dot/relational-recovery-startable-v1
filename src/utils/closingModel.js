export function normalizeClosingAction(item = {}, fallbackLabel = 'Aktion öffnen') {
  return {
    kind: item.kind || 'custom',
    title: item.title || '',
    description: item.description || '',
    meta: item.meta || [],
    assetMeta: item.assetMeta || null,
    actionLabel: item.actionLabel || fallbackLabel,
    href: item.href || null,
    onClick: item.onClick || null,
    target: item.target,
    rel: item.rel,
    preview: item.preview || null,
    previewClassName: item.previewClassName || '',
    actionIcon: item.actionIcon || null,
    author: item.author,
    provider: item.provider,
    age: item.age,
    type: item.type,
  };
}

export function normalizeClosingCollection(collection = {}) {
  return {
    id: collection.id || null,
    eyebrow: collection.eyebrow || null,
    title: collection.title || null,
    description: collection.description || null,
    collectionKind: collection.collectionKind || 'custom',
    items: (collection.items || []).map((item) => normalizeClosingAction(item)),
  };
}

export function createClosingSectionModel(config = {}) {
  return {
    id: config.id || null,
    eyebrow: config.eyebrow || null,
    title: config.title || '',
    accent: config.accent || null,
    description: config.description || null,
    paragraphs: config.paragraphs || [],
    aside: config.aside || null,
    primaryActions: (config.primaryActions || []).map((item) => normalizeClosingAction(item)),
    collections: (config.collections || []).map((collection) => normalizeClosingCollection(collection)),
    relatedLinks: config.relatedLinks
      ? {
          eyebrow: config.relatedLinks.eyebrow || null,
          title: config.relatedLinks.title || null,
          description: config.relatedLinks.description || null,
          items: (config.relatedLinks.items || []).map((item) => normalizeClosingAction(item, 'Seite öffnen')),
        }
      : null,
    notes: config.notes || null,
    references: config.references || null,
    printView: config.printView || null,
  };
}
