# Next.js Preview Links for multilingual DatoCMS Projects

This is a forked version of [Next.js Preview Links](https://github.com/wbobeirne/datocms-plugin-nextjs-preview), witch is used for multilingual [datoCMS](https://www.datocms.com/) projects.

Here the original readme:

## About

Plugin that adds quick links to preview & view your DatoCMS on a Next.js site.
Assumes you have a preview implementation based off of the [official Next.js Preview Mode guide](https://nextjs.org/docs/advanced-features/preview-mode).

## Configuration

After installing the plugin, you'll need to configure the plugin settings like so:

![Configuration screenshot](./docs/configuration.png)

Then you can add it to a field in your model, for example the "slug" field. Select the "slug" field, switch to "Presentation" and select the field add-on. You have to set an entity path, you can sub in any field on the entity using the $field_name, e.g. /blog/$slug or /product/$id.

## Preview

Instead of showing up in the datoCMS sidebar (like the original next.js preview links plugin) this plugin is a "field addon" and is visible in the content editor. 

![Preview screenshot](./docs/preview.png)



This is a forked version of [Next.js Preview Links](https://github.com/wbobeirne/datocms-plugin-nextjs-preview) - a sidebar plugin for datoCMS.
