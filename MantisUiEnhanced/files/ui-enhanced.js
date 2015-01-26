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
                // Move search options row (from below to) above search filters (toggle will then not relocate it)
              var filterTable       = jQuery("#filters_form_open");
              var filterTableRows   = jQuery(filterTable).find("tr");
              var filterRowOptions  = jQuery(filterTableRows).last();
              jQuery(filterRowOptions).insertBefore( jQuery(filterTableRows).first() );
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
     * Find relevant elements (input, select) w/o id-tag and add it generically
     */
    addElementIDs: function() {
        // Add IDs to anonymous <input> elements
        jQuery("body :input:not([id])").each(function(index, element) {
            element.id = element.name;
        });
    }
};

jQuery(document).ready(function() {
    UiEnhanced.init();
});