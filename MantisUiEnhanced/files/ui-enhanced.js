UiEnhanced = {

    /**
     * IDs of elements linked by labels in login page
     */
    loginLabelIDs: [
        "username",
        "password",
        "perm_login",
        "secure_session"
    ],

    init: function() {
      this.addElementIDs();

      switch( document.location.pathname.replace("_page.php", "") ) {
          case "/login":
                // Wrap all login labels with <label> tags, pointing to the rel. <input> element
              jQuery('form[name=login_form]').find("td.category").each(function(index, el){
                  jQuery(el).html("<label for=\"" + UiEnhanced.loginLabelIDs[index] + "\">" + el.innerHTML + "</label");
              });
              break;

          case "/my_view":
              break;

          case "/view_all_bug":
              UiEnhanced.moveBottomTr("#filters_form_open");
              UiEnhanced.moveBottomTr("#buglist", 1);
              UiEnhanced.wrapTextNode(jQuery("#buglist").find('span.small'),  "<label for=\"all_bugs\">");
              UiEnhanced.wrapTextNode(jQuery("#filters_form_closed").find("td").filter(function() {
                  return jQuery(this).attr('colspan') == 2
              }), "<label for=\"search\">");
              break;

          case "/bug_report":
              break;

          case "/changelog":
              break;

          case "/roadmap":
              break;

          case "/summary":
              break;

          case "/manage_overview":
              break;

          case "/account":
              break;
      }
    },

    /**
     * Find relevant elements (input, select) w/o id attribute and add a generic id
     * Generic id is created from the element name, if there's an element w/ that id already: append an offset
     */
    addElementIDs: function() {
        // Add IDs to anonymous <input> elements
        var elementID;
        jQuery("body :input:not([id])").filter(":visible").each(function(index, element) {
            if( element.type != "hidden" && element.name != null && element.name.length > 0 ) {
                element.id = element.name.replace("[", "").replace("]", "");

                if( jQuery(element.id).length > 1 ) {
                    element.id += "-1";
                }
            }
        });
    },

    /**
     * @param   {String}    idElementOuter
     * @param   {Number}    [offsetNew]     Default: 0 (topmost)
     */
    moveBottomTr: function(idElementOuter, offsetNew) {
        offsetNew = typeof offsetNew == 'undefined' ? 0 : offsetNew;

        var rows    = jQuery(idElementOuter).find("tr");
        var lastRow = jQuery(rows).last();
        jQuery(lastRow).insertBefore( jQuery(rows)[offsetNew] );
    },

    /**
     * @param   {Element}   container
     * @param   {String}    wrapTag
     */
    wrapTextNode: function(container,  wrapTag) {
        container.contents().filter(function() {
            return this.nodeType === 3
        }).wrap(wrapTag);
    }
};

jQuery(document).ready(function() {
    UiEnhanced.init();
});