# Getting started

First you need to install Design Manual.

```bash
> npm i design-manual design-manual-scraper --save-dev
```

## Gather components
Then you need to setup your build pipeline. You can automate component aggregation using [Design Manual Scraper](https://www.npmjs.com/package/design-manual-scraper) to look for HTML-comments on your (local) website, [Pug-doc](https://www.npmjs.com/package/pug-doc) if you're using Pug, or some other way - as long as it results in a components.json file, looking like this:

```json
[
  {
    "meta": {
      "name": "my-component",
      "description": "this is my component description"
    },
    "output": "<div class=\"some-tag\">this is some tag</div>"
  }
]
```

The `meta.description` part is optional and, if present, will be parsed using markdown.

---

## Setup build
Then set up Design Manual to use this components.json as a source for your markdown files. The most miminal version looks like this:

```js
const DesignManual = require('design-manual');
DesignManual.build({
  output: 'path/to/export/', // destination dir
  pages: 'path/to/pages/', // dir containing .md files
  components: 'path/to/components.json', // path to the components
  meta: {
    domain: 'my-domain.com',
    title: 'my Design Manual',
    version: 'v1.1.0'
  }
});
```

See [configuration](configuration.html) for more information.

---

## Write documentation pages
Add markdown files for each page you want to create. For example Index.md, Components.md and Guidelines.md

All `.md` files inside `options.pages` will be used as input. Markdown files in subdirectories will also be rendered.

A basic page looks something like this:

```markdown
# Text page
This is my text page.

## Section 1
This is section 1

## Section 2
This is section 2

### Contents
!{my-component}
```

---

### Embed components
You can embed a component in any page by typing wrapping the components name in `!​{}`.
The tag should be an exact match of a components `meta.name` in your json file.

```markdown
!{component-name}
```

!{hello world}

Use double exclamation marks for a simpler view of the component  `!!​{}`, with buttons only visible on mouse over and without the description:

!!{hello world}

For a code-first view of the component use `$​{}` or `$$​{}`

${hello world}
$${hello world}

---

### Table of contents
Use `### Contents` to insert a components table of contents. It will contain all components coming after the contents heading. It will scan for components until it encounters another table of contents heading, or the end of the page.

If you want to change the text of this heading, edit the `contentsFlag` option when setting up.

---

### Markdown
Markdown is parsed using [marked](https://github.com/chjj/marked). HTML is allowed.

---

### Sidebar
All H2's on the page will be used to create in-page-links in the sidebar navigation.