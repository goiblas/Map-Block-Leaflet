=== Map Block Leaflet ===
Author URI: https://github.com/goiblas/leaft-map-block
Plugin URI: https://goiblas.com
Contributors: goiblas
Tags: blocks, gutenberg, editor, map, leaflet 
Requires at least: 5.0
Tested up to: 5.9
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

The  Map Block Leaflet is designed to work with the [Gutenberg editor](https://wordpress.org/plugins/gutenberg/ "Gutenberg Plugin"). It has been created to facilitate, as much as possible, embed maps in the content without the need to include an API key and be able to customize it visually.

**Contribute:**

This plugin is open source software, and you may actively contribute on [Github](https://github.com/goiblas/leaft-map-block "Map Block Leaflet Repository").

== Installation & Setup ==

Note: This plugin requires WordPress 5 or the Gutenberg plugin active.

1. Upload 'leaflet-map-block' to the '/wp-content/plugins/' directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
4. Add new block, find it in the category embed.
5. Search a location and change the option until you get the disdained look.
6. Publish and enjoy

== Screenshots ==

1. Simple map within the editor
2. Realistic theme map

== Changelog ==

= 2.2.1 =
* **Improvement.** Add WordPress tested up version to 5.9

= 2.2.0 =
* **Improvement.** Invalidate size on resize container, thanks to @liqueurdetoile

= 2.1.0 =
* **Improvement.** Remove assets when it isn't in page, thanks to @PatrickFaramaz

= 2.0.3 =
* **Fix.** Multimarker frontend, thanks to @baagi510

= 2.0.2 =
* **Improvement.** Resize user experience

= 2.0.1 =
* **fix.** Increase tested WordPress version

= 2.0.0 =
* **Feat.** Multimarker block
* **Improvement.** Refactor to functional component 
* **Improvement.** Use wp-scripts to compile code

= 1.8.7 =
* **fix.** Remove sourceMap warning, when used in Chrome Devtools, thanks to @thomasprice61
* **fix.** Replace wikimedia tiles by Stadia OSMBright

= 1.8.6 =
* **fix.** Fix center when it is inside columns, thanks to @aribet

= 1.8.5 =
* **fix.** Enqueue lib assets from register_block_type fix use blocks outside the content, thanks to @youdaman

= 1.8.4 =
* **Improvement.** Update version of library Leaflet map

= 1.8.3 =
* **Improvement.** Change automated deploy to github actions

= 1.8.1 =
* **fix.** Update version files

= 1.8.0 =
* **Improvement.** Support custom theme provider, thanks to @jeroensmeets
* **Improvement.** Add new theme watercolor

= 1.7.1 =
* **Fix.** After update a post remove number attributes, thanks to @davinian @jeroensmeets

= 1.7.0 =
* **Improvement.** Allow newlines in tooltip text, thanks to @daviewales
* **Fix.** Define variables and prevent php notices, thanks to @davinian @bjoluc

= 1.6.0 =
* **Security.** Escape tooltip content
* **Improvement.** Update version of library Leaflet map
* **Improvement.** Add assets library Leaflet map

= 1.5.0 =
* **Improvement.** Conditionally Load frontend assets

= 1.4.0 =
* **Improvement.** Improve the theme selector
* **Improvement.** Update version of library Leaflet map
* **Improvement.** Disabled zoom by default

= 1.3.0 =
* **Bug Fix.** No allow align left & right
* **Improvement.** Resize behaviour
* **Improvement.** Support themes with transtions pages
* **Improvement.** Option disable scroll zoom

= 1.2.0 =
* **Bug Fix.** Grayscale theme does not work
* **Bug Fix.** The search engine appears over the block´s toolbar
* **Improvement.** Allow alignments
 
= 1.1.0 =
* Initial release on WordPress.org