// ==UserScript==
// @name            Gfycat Webm Direct Link
// @namespace       OTACON120
// @author          OTACON120
// @license         http://opensource.org/licenses/MIT
// @version         1.0.0
// @description     Adds a direct link to Gfycat WebM files on Gfycat pages
// @updateURL       http://otacon120.com/user-script-files/meta/miscellaneous/gfycat-webm-direct-link/
// @downloadURL     http://otacon120.com/user-script-files/script/miscellaneous/gfycat-webm-direct-link/Gfycat_Webm_Direct_Link.user.js
// @website         http://otacon120.com/scripts/gfycat-webm-direct-link/
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=otacon120%40gmail%2ecom&lc=US&item_name=OTACON120&no_note=0&cn=Comments%3a&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted
// @match           *://*.gfycat.com/*
// @grant           none
// ==/UserScript==

var pageUrl         = window.location,
	gfyShareEl      = {
		url:             pageUrl.protocol + '//zippy.gfycat.com' + pageUrl.pathname + '.webm',
		linkBlock:       document.createElement( 'div' ),
		linkHeader:      document.createElement( 'span' ),
		linkText:        document.createElement( 'span' ),
		linkDescription: document.createElement( 'span' ),
	},
	gfyShareLinks   = document.getElementsByClassName( 'gfyShareLinks' )[0],
	gfyShareGifLink = gfyShareLinks.getElementsByClassName( 'gfyShareLinkBlock' )[1];

// Container
gfyShareEl.linkBlock.classList.add( 'gfyShareLinkBlock' );

// Header
gfyShareEl.linkHeader.classList.add( 'gfyShareLinkHeader')
gfyShareEl.linkHeader.textContent      = 'WebM';

// Link URL
gfyShareEl.linkText.classList.add( 'gfyShareLinkText' );
gfyShareEl.linkText.textContent        = gfyShareEl.url;
gfyShareEl.linkText.onclick = function() {
	if ( window.getSelection ){
		var bV = document.createRange();

		bV.selectNode(this);

		window.getSelection().addRange( bV );
	}
};

// Description
gfyShareEl.linkDescription.setAttribute( 'style', gfyShareGifLink.getElementsByTagName( 'span' )[2].getAttribute( 'style' ) );
gfyShareEl.linkDescription.textContent = 'Faster, high-quality version used for HTML5 video.';

// Put everything together
gfyShareEl.linkBlock.appendChild( gfyShareEl.linkHeader );
gfyShareEl.linkBlock.appendChild( gfyShareEl.linkText );
gfyShareEl.linkBlock.appendChild( gfyShareEl.linkDescription );

// Add to page
gfyShareGifLink.parentNode.insertBefore( gfyShareEl.linkBlock, gfyShareGifLink.nextSibling );
