<?php
# Copyright (C) 2015 Kay Stenschke <kstenschke@coexec.com>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.

class MantisUiEnhancedPlugin extends MantisPlugin {

    /**
     * Register plugin
     */
	function register() {
		$this->name = 'Mantis UI Enhanced';
		$this->description = 'Enhances the MantisBT UI usability (makes dropdowns submit on-change, adds label-tags etc.)';

		$this->version = '0.0.1';
		$this->requires = array(
			'MantisCore' => '1.2.0, < 1.3', # Make it available only to 1.2.x
			'jQuery'     => '1.11.1', // @see https://github.com/mantisbt-plugins/jquery
		);

		$this->author   = 'Kay Stenschke';
		$this->contact  = 'kstenschke@coexec.com';
		$this->url      = 'https://github.com/coexec/mantisbt-uienhanced';
	}

    /**
     * @return array
     */
	function config() {
		return array();
	}

    /**
     * @return array    List of hooks and their callbacks in this plugin
     */
	function hooks() {
		return array(
			'EVENT_LAYOUT_RESOURCES' => 'resources',	// returns content to be appended into <head>
		);
	}

    /**
     * @param   String  $p_event
     * @return  String  Content to be added to <head> section
     */
	function resources( $p_event ) {
        include( 'lang/strings_' . lang_get_current() . '.txt' );

        /** @var String $s_email_reproducibility */
        /** @var String $s_email_severity */
        /** @var String $s_email_priority */
        /** @var String $s_steps_to_reproduce */
        /** @var String $s_select_profile */
        /** @var String $s_or_fill_in */
        /** @var String $s_additional_information */
        /** @var String $s_view_status */
        /** @var String $s_report_stay */

		return '<script type="text/javascript">' /* Define localized labels to allow UiEnhancer sizzle to select element via innerHTML */ . '
                UiEnhancedLabels = {
                    Reproducibility         : "' . $s_email_reproducibility . '",
                    Severity                : "' . $s_email_severity . '",
                    Priority                : "' . $s_email_priority . '",
                    steps_to_reproduce      : "' . $s_steps_to_reproduce . '",
                    select_profile          : "' . $s_select_profile . '",
                    or_fill_in              : "' . $s_or_fill_in . '",
                    additional_information  : "' . $s_additional_information . '",
                    view_status             : "' . $s_view_status . '",
                    report_stay             : "' . $s_report_stay . '"
                };</script>'
             . '<script type="text/javascript" src="' . plugin_file( 'ui-enhanced.js' ) . '"></script>';
	}

}
