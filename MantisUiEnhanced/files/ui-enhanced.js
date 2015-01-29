UiEnhanced = {

    /**
     * IDs of elements linked by labels in login page
     */
    loginLabelIDs: ["username", "password", "perm_login", "secure_session"],

    init: function() {
      this.addElementIDs();

      switch( this.getCurrentPageIdentifier() ) {
          case "login":
                // Wrap all login labels with <label> tags, pointing to the rel. <input> element
              jQuery('form[name=login_form]').find("td.category").each(function(index, el){
                  jQuery(el).html("<label for=\"" + UiEnhanced.loginLabelIDs[index] + "\">" + el.innerHTML + "</label");
              });
              break;

          case "my_view":
              break;

          case "view_all_bug":
                // Move options' rows of tables topmost, to stop them from changing position upon expand/collapse
              UiEnhanced.moveBottomTr("#filters_form_open");
              UiEnhanced.moveBottomTr("#buglist", 1);

                // Make labels clickable <label>s
              UiEnhanced.wrapTextNode(jQuery("#buglist").find('span.small'),  "<label for=\"all_bugs\">");
              UiEnhanced.wrapTextNode(jQuery("#filters_form_closed").find("td").filter(function() {
                  return jQuery(this).attr('colspan') == 2
              }), "<label for=\"search\">");
              break;

          case "bug_report":
                // Initially hide less important fields
                // @todo    make language independent, e.g inject labels via PHP
              UiEnhanced.toggleSecondaryFields("bug_report", false);

                // Add toggle button to show/hide secondary fields
              jQuery('.form-title').parent().parent().append(
                  jQuery(
                      "<tr><td><a style=\"cursor:pointer\" onclick=\"UiEnhanced.toggleSecondaryFields(); return false\">"
                      + "<img border=\"0\" alt=\"+\" src=\"images/plus.png\" />"
                      + "</a>&nbsp;Toggle Secondary Fields</td></tr>"
                  )
              );
              break;

          case "changelog":
              break;

          case "roadmap":
              break;

          case "summary":
              break;

          case "manage_overview":
              break;

          case "account":
              break;
      }
    },

    /**
     * @param   {String}    [section]   Default: "bug_report"
     * @param   {Boolean}   [show]      If undefined: detect and inverse current visibility of fields of section
     */
    toggleSecondaryFields: function(section, show) {
        section = typeof section == 'undefined' ? 'bug_report' : section;

        var visibilityMethod = typeof show == 'undefined' ? false : (show ? 'show' : 'hide');

        if(section == "bug_report") {
            if( !visibilityMethod ) {
                visibilityMethod = jQuery(UiEnhanced.findTdByContainedText("Reproducibility").closest('tr')).is(":visible") ? "hide" : "show";
            }
            jQuery(UiEnhanced.findTdByContainedText( UiEnhancedLabels.Reproducibility ).closest('tr'))[visibilityMethod]();
            jQuery(UiEnhanced.findTdByContainedText( UiEnhancedLabels.Severity ).closest('tr'))[visibilityMethod]();
            jQuery(UiEnhanced.findTdByContainedText( UiEnhancedLabels.Priority ).closest('tr'))[visibilityMethod]();
            jQuery(UiEnhanced.findTdByContainedText( UiEnhancedLabels.steps_to_reproduce ).closest('tr'))[visibilityMethod]();
            jQuery(UiEnhanced.findTdByContainedText( UiEnhancedLabels.select_profile ).closest('tr'))[visibilityMethod]();
            jQuery(UiEnhanced.findTdByContainedText( UiEnhancedLabels.or_fill_in ).closest('tr'))[visibilityMethod]();
            jQuery(UiEnhanced.findTdByContainedText( UiEnhancedLabels.additional_information ).closest('tr'))[visibilityMethod]();
            jQuery(UiEnhanced.findTdByContainedText( UiEnhancedLabels.view_status ).closest('tr'))[visibilityMethod]();
            jQuery(UiEnhanced.findTdByContainedText( UiEnhancedLabels.report_stay ).closest('tr'))[visibilityMethod]();
        }
    },

    /**
     * @returns {String}
     */
    getCurrentPageIdentifier: function() {
        var page = document.location.pathname.replace("_page.php", "");
        var parts= page.split("/");

        return parts[ parts.length-1 ];
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
    },

    /**
     * @param   {String}    text
     * @returns {Element}
     */
    findTdByContainedText: function(text) {
        return jQuery("td").filter(function() {
            return jQuery.text([this]).indexOf(text) > -1;
        });
    }
};

jQuery(document).ready(function() {
    UiEnhanced.init();
});