# Design Manual (not finished)
Create a living, breathing design manual (or styleguide if you will). This package combines your Markdown files with generated json and creates a beautiful design manual.

---

## Getting started

1. ### Install
  ```bash
  npm install design-manual
  ```

2. ### Set up
  ```js
  var DesignManual = require('design-manual');
  new DesignManual({
    output: 'path/to/export/',
    pages: 'path/to/pages/',
    components: 'path/to/components.json',
    meta: {
      domain: 'my-domain.com',
      title: 'my Design Manual'
    }
  });
  ```

3. ### Create your page pages using Markdown
  See [Creating pages](#creating-pages).

4. ### Create components.json
  This can be done through Jade-doc or some other generator. 

  ```json
  [
    {
      "meta": {
        "name": "my-component"
      },
      "file": "path/to/file.jade",
      "source": "div.some-tag\n  | this is some tag",
      "output": "<div class=\"some-tag\">this is some tag</div>"
    }
  ]
  ```

  The `source` part is optional.


---

## Creating pages
There are two types of pages you can generate.

  1. ### Text page
    A basic text page looks like this:

    ```markdown
    # Text page
    This is my text page.

    ## Section 1
    This is section 1

    ## Section 2
    This is section 2
    ```

    The h2's will be used to create in-page-links in the sidebar navigation.

    Markdown is parsed using [marked](https://github.com/chjj/marked). HTML is allowed.

    If a file called Home.md is found, it will be placed first in the navigation.

  2. ### Components page
    Create a file called Components.md. This page is where your components are documented. The file should look like this.

    ```markdown
    # My Components Page
    This is the components page.

    ---

    ## Section 1
    This is the description of section number 1.

    ### Contents
    - extends
    - some-tag

    ---

    ## Section 2
    This is the description of section number 2.

    ### Contents
    - mixin
    - inclusion tag

    ---

    ## Section 3
    This is the description of section number 3.

    ### Contents
    - some-tag
    - mixin
    - extends

    ---

    ## Section 4
    Some other section

    More content.

  ```
  
  The ```### Contents``` part is where the components will be rendered. If you want to change the text of this heading, make sure to edit the `contentsId` option when setting up. 

  The items in the list directly next to this heading will be used to look up data in your components.json, they should be an exact match of `meta.name` in your json file.

  The h2's will be used to create in-page-links in the sidebar navigation.


---

## Options

```js
new DesignManual({
  output: 'path/to/export/',
  pages: 'path/to/pages/',
  components: 'path/to/components.json',
  includeCss: ['path/to/style1.css'],
  meta: {
    domain: 'mywebsite.com',
    title: 'My Design Manual',
    avatar: 'http://placehold.it/80x80'
  },
  subnav: [
    {
      domain: 'google.com',
      title: 'Title',
      href: 'http://www.google.com',
      avatar: 'http://placehold.it/80x80'
    },
    {
      domain: 'google.com',
      title: 'Title',
      href: 'http://www.google.com',
      avatar: 'http://placehold.it/80x80'
    }
  ],
  headHtml: '<script>console.log("im in the head");</script>',
  footerHtml: '<script>console.log("im in the footer");</script>',
  contentsId: '#contents'
});
```



| option        | default value | type      | description                  |
|---------------|---------------|-----------|------------------------------|
| output        | './httpdocs/' | string    | output directory
| pages         | ''            | string    | directory that holds your pages 
| components    | ''            | string    | json file with components
| includeCss    | []            | array     | list of css files to include in components
| meta          |               | object    | 
| meta.domain   | ''            | string    | domain for your project
| meta.title    | ''            | string    | title for your project
| meta.avatar   | ''            | string    | avatar for your project
| subnav        | []            | array     | array of objects that populate the dropdown navigation with sub projects
| - {}.domain   |               | string    | domain for project
| - {}.title    |               | string    | title of project
| - {}.href     |               | string    | link to project
| - {}.avatar   |               | string    | 80x80 image for project
| headHtml      | ''            | string    | string of html to include in the head
| footerHtml    | ''            | string    | string of html to include in the footer
| contentsId    | '#contents'   | string    | css id to identify the contents heading
