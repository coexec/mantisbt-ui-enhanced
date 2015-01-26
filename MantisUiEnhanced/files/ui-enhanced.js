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
      this.insertStyles();
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
     * Add <style> tag into <head>
     */
    insertStyles: function() {
        var rules =
            "table.hoverable tr { filter: sepia(0%) }" +
            "table.hoverable tr:hover { filter: sepia(20%) }";
        jQuery("<style type='text/css'>" + rules + "</style>").appendTo("head");
    },

    /**
     * Find relevant elements (input, select) w/o id-tag and add it generically
     */
    addElementIDs: function() {
        // Add IDs to anonymous <input> elements
        jQuery("body :input:not([id])").each(function(index, element) {
            element.id = element.name;
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
    }

};

jQuery(document).ready(function() {
    UiEnhanced.init();
});