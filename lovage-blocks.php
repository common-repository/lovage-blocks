<?php
/**
 * Plugin Name: Lovage Blocks
 * Plugin URI: https://lovage.io/blocks
 * Description: Lovage Blocks offers the extended blocks for Gutenberg Editor.
 * Author: Lovage
 * Author URI: https://lovage.io/
 * Version: 0.0.2
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Lovage Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
