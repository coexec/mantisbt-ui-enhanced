Enhanced UI Plugin for MantisBT
===============================

A simple plugin to enhance the usability of the default user interface of MantisBT.


What does it do?
----------------

* Better usability: All labels inside the login and bugs overview pages are changed into clickable <label> tags
* Faster entering of new issues: All secondary (less important) fields for filing new issues are by default hidden, they can be shown with a new button.
* More harmonic UI: The options row in table based lists is moved topmost, so that toggeling the options does not cause itself to "jump" in the page
* Easier DOM manipulation: "Anonymous" elements (without an id attribute) in the DOM of any MantisBT page are enhanced with a generic id.
* Less Clutter: The default footer is reduced to the MantisBT logo and link.


Compatibility
-------------

The theme was created and tested with Mantis release 1.2.17


Installation
------------
0. Make sure the JQuery plugin for MantisBT is installed.
1. Copy the directory "MantisUiEnhanced" into the "plugins" directory of your MantisBT installation.
2. Activate the plugin in the Mantis backend under: Manage > Manage Plugins


Authors and License
-------------------

Created in 2015 by Kay Stenschke.

Licensed under the GNU GENERAL PUBLIC LICENSE, Version 2.