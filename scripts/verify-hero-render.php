<?php
/**
 * Offline render harness for the hero section.
 *
 * Stubs just enough of WordPress + the theme's own helpers to execute
 * template-parts/home/section-hero.php and capture its HTML, so the markup can
 * be checked without standing up a WP install.
 */

define( 'ABSPATH', __DIR__ );
define( 'IPEKCI_DIR', dirname( __DIR__ ) . '/ipekci-theme/' );
define( 'IPEKCI_URI', 'https://example.test/wp-content/themes/ipekci-theme/' );

function __( $t, $d = '' ) { return $t; }
function esc_html( $t ) { return htmlspecialchars( (string) $t, ENT_QUOTES, 'UTF-8' ); }
function esc_attr( $t ) { return htmlspecialchars( (string) $t, ENT_QUOTES, 'UTF-8' ); }
function esc_url( $t ) { return htmlspecialchars( (string) $t, ENT_QUOTES, 'UTF-8' ); }
function esc_html_e( $t, $d = '' ) { echo esc_html( $t ); }
function esc_attr_e( $t, $d = '' ) { echo esc_attr( $t ); }
function get_theme_mod( $k, $default = false ) { return $default; }
function wp_get_attachment_url( $id ) { return ''; }
function sanitize_key( $k ) { return preg_replace( '/[^a-z0-9_\-]/', '', strtolower( $k ) ); }
function home_url( $p = '/' ) { return 'https://example.test' . $p; }
function add_action( ...$a ) {}
function add_filter( ...$a ) {}
function absint( $n ) { return abs( (int) $n ); }
function wp_parse_args( $a, $d = array() ) { return array_merge( $d, (array) $a ); }
function sanitize_text_field( $t ) { return trim( strip_tags( (string) $t ) ); }
function wp_kses_post( $t ) { return $t; }
function trailingslashit( $t ) { return rtrim( (string) $t, "/\\" ) . '/'; }

require_once IPEKCI_DIR . 'inc/homepage-options.php';

// Only the icon helper is needed; template-tags.php pulls in far more.
if ( ! function_exists( 'ipekci_hero_icon' ) ) {
	function ipekci_hero_icon( $name, $size = 16 ) {
		return '<svg class="icon-' . esc_attr( $name ) . '" width="' . (int) $size . '"></svg>';
	}
}

ob_start();
require IPEKCI_DIR . 'template-parts/home/section-hero.php';
$html = ob_get_clean();

// Dump the markup next to the theme (gitignored) for eyeballing, not into scripts/.
file_put_contents( dirname( __DIR__ ) . '/hero-output.html', $html );

// ---- Assertions -----------------------------------------------------------
$checks = array(
	'renders a section'            => (bool) preg_match( '/<section[^>]+id="ipekci-hero"/', $html ),
	'exactly one <h1>'             => 1 === preg_match_all( '/<h1[\s>]/', $html ),
	'3 background slides'          => 3 === preg_match_all( '/class="ipekci-hero__bg-slide/', $html ),
	'3 background tabs'            => 3 === preg_match_all( '/role="tab"/', $html ),
	'1 tablist container'          => 1 === preg_match_all( '/role="tablist"/', $html ),
	'3 tab fills'                  => 3 === preg_match_all( '/ipekci-hero__bg-tab-fill/', $html ),
	'one tab marked selected'      => 1 === preg_match_all( '/aria-selected="true"/', $html ),
	'5 showcase images'            => 5 === preg_match_all( '/class="ipekci-hero-showcase__image[ "]/', $html ),
	'5 showcase thumbs'            => 5 === preg_match_all( '/class="ipekci-hero-showcase__thumb[ "]/', $html ),
	'4 trust pills'                => 4 === preg_match_all( '/class="ipekci-hero-trust-pill"/', $html ),
	'2 CTAs'                       => 2 === preg_match_all( '/class="(?:ipek-btn-premium|ipek-btn-ghost|lux-btn) group"/', $html ),
	'dual-cta class on CTA row'    => (bool) strpos( $html, 'ipekci-hero__cta-row ipek-dual-cta' ),
	'exactly one active bg slide'  => 1 === preg_match_all( '/ipekci-hero__bg-slide is-active/', $html ),
	'slide 0 is eager + priority'  => (bool) preg_match( '/hero-slide-1-premium\.jpg"[^>]*loading="eager"[^>]*fetchpriority="high"/s', $html ),
	'no <video> element'           => false === strpos( $html, '<video' ),
	'no Ipekci CDN URL'            => false === strpos( $html, 'ipekcislachterij' ),
	'no Ipekci brand string'       => false === strpos( $html, 'Ipek' ),
	'headline is Ayat'             => false !== strpos( $html, 'Premium Halal' ) && false !== strpos( $html, 'vleesgroothandel' ),
	'CTA1 -> /producten'           => false !== strpos( $html, 'href="https://example.test/producten"' ),
	'CTA2 -> /contact'             => false !== strpos( $html, 'href="https://example.test/contact"' ),
	'Ayat logo in badge'           => false !== strpos( $html, 'ayat/logo-transparent.png' ),
	'Ayat halal stamp text'        => false !== strpos( $html, 'AYAT FOOD' ),
	'every img has alt'            => preg_match_all( '/<img\b/', $html ) === preg_match_all( '/<img\b[^>]*\balt=/s', $html ),
	'tablist is outside aria-hidden' => strpos( $html, 'ipekci-hero__bg-tabs' ) > strpos( $html, '</div>' ),
	'sticker keys on all slides'   => 5 === preg_match_all( '/data-sticker="/', $html ),
);

$fail = 0;
foreach ( $checks as $label => $ok ) {
	printf( "%-34s %s\n", $label, $ok ? 'PASS' : 'FAIL' );
	if ( ! $ok ) {
		$fail++;
	}
}

printf( "\n%d checks, %d failed\n", count( $checks ), $fail );
printf( "img count: %d\n", preg_match_all( '/<img\b/', $html ) );
exit( $fail ? 1 : 0 );
