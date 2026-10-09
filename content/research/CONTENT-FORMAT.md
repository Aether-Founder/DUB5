# Research Hub Content Format

This document describes the JSON format for storing research posts in the DUB5 Research Hub.

## Directory Structure

```
content/research/
├── index.json          # Master index with all posts metadata
└── posts/
    ├── magister-architecture.json
    ├── schoolyear-lockdown.json
    └── kwizl-exams.json
```

## Index File Format (index.json)

The index file contains:
- Categories
- Topics
- Platforms
- Methods
- Posts list with metadata

## Post File Format

Each post file (e.g., `magister-architecture.json`) contains:

### Required Fields

```json
{
  "id": "unique-identifier",
  "slug": "url-friendly-slug",
  "title": "Post Title",
  "subtitle": "Subtitle",
  "summary": "Brief summary",
  "status": "published|draft|archived",
  "category": "category-id",
  "contentType": "technical-report",
  "platforms": ["platform-id"],
  "topics": ["topic-id"],
  "methods": ["method-id"],
  "tags": ["tag1", "tag2"],
  "authors": [{"name": "Name", "role": "Role"}],
  "publishedAt": "ISO-8601-date",
  "updatedAt": "ISO-8601-date",
  "readingTime": 15,
  "isFeatured": true,
  "impactLevel": "low|medium|high|critical",
  "statusBadge": "Educational",
  "ethicalNotice": "Ethical notice text",
  "quickFacts": {},
  "tableOfContents": [],
  "sections": [],
  "artifacts": [],
  "references": [],
  "relatedPosts": []
}
```

## Section Types

The `sections` array supports the following content types:

### 1. Markdown
```json
{
  "id": "section-id",
  "type": "markdown",
  "content": "# Heading\n\nParagraph text..."
}
```

### 2. Callout
```json
{
  "id": "section-id",
  "type": "callout",
  "variant": "info|warning|error",
  "title": "Optional Title",
  "content": "Callout text"
}
```

### 3. Code Block
```json
{
  "id": "section-id",
  "type": "codeblock",
  "title": "Optional Title",
  "language": "javascript|python|json|etc",
  "filename": "example.js",
  "content": "code here"
}
```

### 4. Terminal Block
```json
{
  "id": "section-id",
  "type": "terminal",
  "title": "Optional Title",
  "os": "Windows 11|Linux|macOS",
  "warning": "Optional warning text",
  "content": "terminal output"
}
```

### 5. JSON Viewer
```json
{
  "id": "section-id",
  "type": "json",
  "title": "Optional Title",
  "content": { "key": "value" }
}
```

### 6. Image
```json
{
  "id": "section-id",
  "type": "image",
  "title": "Optional Title",
  "src": "/path/to/image.png",
  "alt": "Alt text",
  "caption": "Optional caption"
}
```

### 7. Video
```json
{
  "id": "section-id",
  "type": "video",
  "title": "Optional Title",
  "src": "/path/to/video.mp4",
  "type": "video/mp4",
  "poster": "/path/to/poster.jpg",
  "caption": "Optional caption"
}
```

### 8. File Artifact
```json
{
  "id": "section-id",
  "type": "file",
  "title": "Optional Title",
  "filename": "document.pdf",
  "type": "PDF",
  "size": "2.3 MB",
  "description": "Description"
}
```

### 9. Artifact Collection
```json
{
  "id": "section-id",
  "type": "artifact",
  "title": "Artifacts Section",
  "items": [
    {
      "id": "artifact-1",
      "name": "Document Name",
      "type": "PDF",
      "size": "2.3 MB",
      "sensitivity": "Public|Sanitized|Redacted",
      "description": "Description",
      "icon": "📄"
    }
  ]
}
```

## Adding a New Post

1. Create a new JSON file in `content/research/posts/`
2. Follow the format above
3. Add the post metadata to `content/research/index.json` in the `posts` array
4. Add the slug to the table of contents in the post file

## Taxonomy IDs

### Categories
- deep-research
- technical-overview
- security-analysis
- privacy-review
- osint-investigation
- field-notes
- tooling-guide
- documentation-analysis
- architecture-breakdown

### Topics
- edtech
- identity-sso
- apis
- osint
- reverse-engineering
- privacy-compliance
- lockdown-browsers
- cloud-infrastructure
- auth-authorization

### Platforms
- magister
- kwizl
- schoolyear
- somtoday
- canvas
- brightspace
- digid
- other-dutch-saas

### Methods
- network-analysis
- api-analysis
- osint
- forensics
- threat-modeling
- reverse-engineering
- documentation-review
- privacy-review
