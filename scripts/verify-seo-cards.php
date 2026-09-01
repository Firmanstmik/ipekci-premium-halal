<?php
/**
 * Offline check for ipekci_seo_card() and the producten catalogue slugs.
 *
 * Confirms every route and every catalogue category resolves to a share card
 * that actually ships with the theme, which is what the new per-category SEO
 * branch in inc/seo.php depends on.
 */

define( 'ABSPATH', __DIR__ );
define( 'IPEKCI_DIR', dirname( __DIR__ ) . '/ipekci-theme/' );
define( 'IPEKCI_URI', 'https://example.test/wp-content/themes/ipekci-theme/' );

function sanitize_key( $k ) { return preg_replace( '/[^a-z0-9_\-]/', '', strtolower( (string) $k ) ); }

// Lift just the resolver out of inc/seo.php rather than booting the whole module.
$seo = file_get_contents( IPEKCI_DIR . 'inc/seo.php' );
preg_match( '/function ipekci_seo_card\(.*?\n}/s', $seo, $m );
if ( ! $m ) {
	exit( "could not extract ipekci_seo_card()\n" );
}
eval( $m[0] );

$routes = array( 'home', 'producten', 'ons-verhaal', 'vacatures', 'contact', 'voor-wie' );
$categories = array(
	'doner', 'shoarma', 'gevogelte', 'vleessoorten',
	'diepvriesproducten', 'turkse-pizza', 'gegrilde-producten', 'tortilla-durum',
);

$fail = 0;

echo "Route cards\n";
foreach ( $routes as $slug ) {
	$card = ipekci_seo_card( $slug );
	printf( "  %-22s %s\n", $slug, $card ? 'PASS' : 'FAIL (no card)' );
	if ( ! $card ) {
		$fail++;
	}
}

echo "\nCategory cards\n";
foreach ( $categories as $slug ) {
	$card = ipekci_seo_card( $slug );
	printf( "  %-22s %s\n", $slug, $card ? 'PASS' : 'FAIL (no card)' );
	if ( ! $card ) {
		$fail++;
	}
}

echo "\nGuards\n";
$guards = array(
	'unknown slug -> empty'  => '' === ipekci_seo_card( 'does-not-exist' ),
	'empty slug -> empty'    => '' === ipekci_seo_card( '' ),
	'traversal is sanitised' => '' === ipekci_seo_card( '../../wp-config' ),
);
foreach ( $guards as $label => $ok ) {
	printf( "  %-22s %s\n", $label, $ok ? 'PASS' : 'FAIL' );
	if ( ! $ok ) {
		$fail++;
	}
}

// Catalogue slugs must match the shipped card filenames exactly, or the branch
// silently falls back to the hero image for that category.
$declared = array();
$data = file_get_contents( IPEKCI_DIR . 'inc/producten-data.php' );
preg_match_all( "/'slug'\s*=>\s*'([a-z0-9\-]+)'/", $data, $sm );
$declared = array_values( array_unique( $sm[1] ) );
sort( $declared );
$expected = $categories;
sort( $expected );

echo "\nCatalogue slugs match card names\n";
$match = ( $declared === $expected );
printf( "  declared: %s\n", implode( ', ', $declared ) );
printf( "  %-22s %s\n", 'exact match', $match ? 'PASS' : 'FAIL' );
if ( ! $match ) {
	$fail++;
}

printf( "\n%d failures\n", $fail );
exit( $fail ? 1 : 0 );
