// ==UserScript==
// @name            Gfycat WebM Direct Link
// @namespace       OTACON120
// @author          OTACON120
// @license         http://opensource.org/licenses/MIT
// @version         3.0.0
// @description     Adds direct URLs to Gfycat GIF/WebM/MP4 files on Gfycat pages
// @updateURL       http://otacon120.com/user-script-files/meta/miscellaneous/gfycat-webm-direct-link/
// @downloadURL     http://otacon120.com/user-script-files/script/miscellaneous/gfycat-webm-direct-link/Gfycat_Webm_Direct_Link.user.js
// @website         http://otacon120.com/scripts/gfycat-webm-direct-link/
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=otacon120%40gmail%2ecom&lc=US&item_name=OTACON120&no_note=0&cn=Comments%3a&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted
// @match           *://*.gfycat.com/*
// @grant           none
// ==/UserScript==
var controlContainer,
	outsideHoverContainer = document.getElementById( 'outside-hover-container' ),
	urlsContainer         = document.createElement( 'div' ),
	urlLinks              = document.createElement( 'div' ),
	urlBtnContainer       = document.createElement( 'span' ),
	urlBtn                = document.createElement( 'i' )
	urlBtnInit            = setInterval( insertUrlButton, 500 );

// Create and append URL/description into URLs container
function addUrlListing( type, url ) {
	var urlBox          = document.createElement( 'div' ),
		urlBoxTitle     = document.createElement( 'div' ),
		urlInputWrapper = document.createElement( 'span' ),
		urlInput        = document.createElement( 'input' ),
		copyUrlBtn      = document.getElementsByClassName( 'copy-url-button' )[0].cloneNode( true );

	// URL Box
	urlBox.className = 'url-box url-box--embed url-box--link';

	// URL Box Title
	urlBoxTitle.className   = 'url-box-title';
	urlBoxTitle.textContent = type;

	// URL Input Wrapper
	urlInputWrapper.className = 'url-input-wrapper';

	// URL Input
	urlInput.id        = 'urlEmbed' + type.replace( /[^a-zA-Z0-9]/g, '' );
	urlInput.className = 'url-input';
	urlInput.type      = 'text'
	urlInput.value     = url;
	urlInput.setAttribute( 'readonly', 'readonly' );

	// Copy URL Button
	copyUrlBtn.dataset.clipboardTarget = '#' + urlInput.id;

	urlInputWrapper.appendChild( urlInput );
	urlInputWrapper.appendChild( copyUrlBtn );

	urlBox.appendChild( urlBoxTitle );
	urlBox.appendChild( urlInputWrapper );

	urlLinks.appendChild( urlBox );
}

function hideOverlay( btn, overlay ) {
	if ( btn.classList.contains( 'active' ) || ! overlay.classList.contains( 'is-hidden' ) ) {
		btn.classList.remove( 'active' );
		overlay.classList.add( 'is-hidden' );
	}
}

function insertUrlButton() {
	if ( controlContainer = document.getElementById( 'control-container' ) ) {
		clearInterval( urlBtnInit );

		var	controlsRight = controlContainer.getElementsByClassName( 'right' )[0],
			gifLink       = document.getElementById( 'gifLink' ),
			gifUrl        = gifLink.href,
			webmUrl       = document.getElementById( 'webmSource' ).src,
			mp4Url        = document.getElementById( 'mp4Source' ).src,
			socialBtn     = document.getElementById( 'share-button' ),
			embedBtn      = document.getElementById( 'embed-button' );


		// Get mobile URL
		mobileUrl = mp4Url.replace( /\/\/.*?\.gfycat.com/, '//thumbs.gfycat.com' ).replace( /\.mp4$/, '-mobile.mp4' );

		// URL button container
		urlBtnContainer.className = 'right-element';

		// URL button
		urlBtn.id        = 'urls-button';
		urlBtn.className = 'fa fa-link';
		urlBtn.title     = 'URLs';
		urlBtn.onclick = function() {
			var socialContainer = document.getElementById( 'social-container' ),
				embedContainer  = document.getElementById( 'embed-container' );

			hideOverlay( socialBtn, socialContainer );
			hideOverlay( embedBtn, embedContainer );

			this.classList.toggle( 'active' );
			urlsContainer.classList.toggle( 'is-hidden' );
		}

		socialBtn.addEventListener(
			'click',
			function() {
				hideOverlay( urlBtn, urlsContainer );
			}
		);

		embedBtn.addEventListener(
			'click',
			function() {
				hideOverlay( urlBtn, urlsContainer );
			}
		);

		urlBtnContainer.appendChild( urlBtn );
		controlsRight.insertBefore( urlBtnContainer, gifLink.parentNode );

		// URLs Container
		urlsContainer.id        = 'urls-container';
		urlsContainer.className = 'embed-container urls-container is-hidden';

		// URLs container inner
		urlLinks.className = 'embed-links urls-links';
		
		urlsContainer.appendChild( urlLinks );
		outsideHoverContainer.appendChild( urlsContainer );

		// Add URL Listings
		addUrlListing( 'GIF', gifUrl );
		addUrlListing( 'WebM', webmUrl );
		addUrlListing( 'MP4', mp4Url );
		addUrlListing( 'Mobile (MP4)', mobileUrl );

		new Clipboard( '.urls-links .copy-url-button' );
	}
}
