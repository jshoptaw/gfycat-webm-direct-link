// ==UserScript==
// @name            Gfycat WebM Direct Link
// @namespace       OTACON120
// @author          OTACON120
// @license         http://opensource.org/licenses/MIT
// @version         3.0.3
// @description     Adds direct URLs to Gfycat GIF/WebM/MP4 files on Gfycat pages
// @updateURL       http://otacon120.com/user-script-files/meta/miscellaneous/gfycat-webm-direct-link/
// @downloadURL     http://otacon120.com/user-script-files/script/miscellaneous/gfycat-webm-direct-link/Gfycat_Webm_Direct_Link.user.js
// @website         http://otacon120.com/scripts/gfycat-webm-direct-link/
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=otacon120%40gmail%2ecom&lc=US&item_name=OTACON120&no_note=0&cn=Comments%3a&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted
// @match           *://*.gfycat.com/*
// @grant           none
// ==/UserScript==
var controlContainer,
	mainContainer         = document.getElementById( 'main-container' ),
	outsideHoverContainer = document.getElementById( 'outside-hover-container' ),
	scriptCustomStyle     = document.createElement( 'style' ),
	urlsContainer         = document.createElement( 'div' ),
	urlLinks              = document.createElement( 'div' ),
	urlBtn                = document.createElement( 'i' ),
	urlBtnInit            = setInterval( insertUrlButton, 500 );

// Insert custom CSS styles
scriptCustomStyle.id            = 'o120-custom-script-style';
scriptCustomStyle.textContent   = `
.ic-link {
	width: 15px;
	height: 15px;
	background: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22512%22%20height%3D%22512%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M459.654%20233.373l-90.531%2090.5c-49.969%2050-131.031%2050-181%200-7.875-7.844-14.031-16.688-19.438-25.813l42.063-42.063c2-2.016%204.469-3.172%206.828-4.531%202.906%209.938%207.984%2019.344%2015.797%2027.156%2024.953%2024.969%2065.563%2024.938%2090.5%200l90.5-90.5c24.969-24.969%2024.969-65.563%200-90.516-24.938-24.953-65.531-24.953-90.5%200l-32.188%2032.219c-26.109-10.172-54.25-12.906-81.641-8.891l68.578-68.578c50-49.984%20131.031-49.984%20181.031%200%2049.97%2049.986%2049.97%20131.033.001%20181.017zM220.326%20382.186l-32.203%2032.219c-24.953%2024.938-65.563%2024.938-90.516%200-24.953-24.969-24.953-65.563%200-90.531l90.516-90.5c24.969-24.969%2065.547-24.969%2090.5%200%207.797%207.797%2012.875%2017.203%2015.813%2027.125%202.375-1.375%204.813-2.5%206.813-4.5l42.063-42.047c-5.375-9.156-11.563-17.969-19.438-25.828-49.969-49.984-131.031-49.984-181.016%200l-90.5%2090.5c-49.984%2050-49.984%20131.031%200%20181.031%2049.984%2049.969%20131.031%2049.969%20181.016%200l68.594-68.594c-27.407%204.031-55.548%201.281-81.642-8.875z%22%2F%3E%3C%2Fsvg%3E) 0 0 / 15px;
}`;

document.head.appendChild( scriptCustomStyle );

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
	urlInput.type      = 'text';
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
	if ( controlContainer = document.getElementById( 'controls-container' ) ) {
		clearInterval( urlBtnInit );

		var	controlsRight = controlContainer.getElementsByClassName( 'right' )[0],
			gifLink       = document.getElementById( 'large-gif' ),
			gifUrl        = gifLink.href,
			webmUrl       = document.getElementById( 'webmSource' ).src,
			mp4Url        = document.getElementById( 'mp4Source' ).src,
			socialBtn     = document.getElementById( 'share-button' ),
			embedBtn      = document.getElementById( 'embed-button' );


		// Get mobile URL
		mobileUrl = mp4Url.replace( /\/\/.*?\.gfycat.com/, '//thumbs.gfycat.com' ).replace( /\.mp4$/, '-mobile.mp4' );

		// URL button
		urlBtn.id        = 'urls-button';
		urlBtn.className = 'ic ic-link';
		urlBtn.title     = 'URLs';
		urlBtn.onclick = function() {
			var socialContainer = document.getElementById( 'social-container' ),
				embedContainer  = document.getElementById( 'embed-container' );

			hideOverlay( socialBtn, socialContainer );
			hideOverlay( embedBtn, embedContainer );

			this.classList.toggle( 'active' );
			urlsContainer.classList.toggle( 'is-hidden' );
		};

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

		controlsRight.insertBefore( urlBtn, embedBtn.nextSibling );

		// URLs Container
		urlsContainer.id        = 'urls-container';
		urlsContainer.className = 'embed-container urls-container is-hidden';

		// URLs container inner
		urlLinks.className = 'embed-links urls-links';

		urlsContainer.appendChild( urlLinks );
		mainContainer.appendChild( urlsContainer );

		// Add URL Listings
		addUrlListing( 'GIF', gifUrl );
		addUrlListing( 'WebM', webmUrl );
		addUrlListing( 'MP4', mp4Url );
		addUrlListing( 'Mobile (MP4)', mobileUrl );

		new Clipboard( '.urls-links .copy-url-button' );
	}
}
