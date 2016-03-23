// ==UserScript==
// @name            Gfycat Webm Direct Link
// @namespace       OTACON120
// @author          OTACON120
// @license         http://opensource.org/licenses/MIT
// @version         2.0.2
// @description     Adds direct URLs to Gfycat GIF/WebM/MP4 files on Gfycat pages
// @updateURL       http://otacon120.com/user-script-files/meta/miscellaneous/gfycat-webm-direct-link/
// @downloadURL     http://otacon120.com/user-script-files/script/miscellaneous/gfycat-webm-direct-link/Gfycat_Webm_Direct_Link.user.js
// @website         http://otacon120.com/scripts/gfycat-webm-direct-link/
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=otacon120%40gmail%2ecom&lc=US&item_name=OTACON120&no_note=0&cn=Comments%3a&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted
// @match           *://*.gfycat.com/*
// @grant           none
// @require         https://greasyfork.org/scripts/6414-grant-none-shim/code/%22@grant%20none%22%20Shim.js
// ==/UserScript==

var mobileUrl, bodyBgColor,
	pageUrl        = window.location,
	shareContainer = document.getElementById( 'share-container' ),
	hdBtn          = document.getElementById( 'mode' ),
	gifLink        = shareContainer.getElementsByClassName( 'gifLink' )[0],
	gifUrl         = gifLink.href,
	webmUrl        = document.getElementById( 'webmSource' ).src,
	mp4Url         = document.getElementById( 'mp4Source' ).src,
	urlsContainer  = document.createElement( 'div' ),
	urlBtn         = document.createElement( 'button' )

bodyBgColor = getComputedStyle( document.body ).getPropertyValue( 'background-color' ).split( '(' )[1].split( ')' )[0];

GM_addStyle( '\
.url-btn {\
	-webkit-appearance: none;\
	-moz-appearance: none;\
	appearance: none;\
	background: transparent;\
	border: 1px solid #d8d8d8;\
	-webkit-border-radius: 3px;\
	-moz-border-radius: 3px;\
	border-radius: 3px;\
	cursor: pointer;\
	color: #d8d8d8;\
	opacity: 0.8;\
	font-size: .6875em;\
	bottom: 10px;\
	margin: 0;\
	padding: 0 ' + getComputedStyle( gifLink ).getPropertyValue( 'padding-left' ) + ';\
	position: absolute;\
	right: 48px;\
	pointer-events: all;\
	font-family: inherit;\
	height: 20px;\
	-webkit-box-sizing: initial;\
	-moz-box-sizing: initial;\
	box-sizing: initial;\
}\
\
.hd[style*="display"] ~ .url-btn {\
	right: 80px;\
}\
\
.mobile-mp4-url {\
	display: none;\
}\
\
.hd[style*="display"] ~ .urls-container .mobile-mp4-url {\
	display: block;\
}\
\
.url-btn.active {\
	opacity: 1;\
	border-color: #fff;\
	color: #fff;\
}\
\
.url-btn.focus,\
.url-btn.active {\
	outline: none;\
}\
\
.urls-container {\
	pointer-events: all;\
	display: none;\
	position: absolute;\
	right: ' + getComputedStyle( hdBtn ).getPropertyValue( 'right' ) + ';\
	top: ' + getComputedStyle( shareContainer ).getPropertyValue( 'height' ) + ';\
	cursor: auto;\
	background: rgba(' + bodyBgColor + ', 0.65);\
	border-radius: 3px;\
	padding: 7px;\
	color: ' + getComputedStyle( document.getElementsByClassName( 'views' )[0] ).getPropertyValue( 'color' ) + ';\
	font-size: 11px;\
}\
\
.urls-container.active {\
	display: block;\
}\
\
	.url-label {\
		cursor: pointer;\
		float: left;\
		padding: 0 7px 0 0;\
		width: 85px;\
		font-weight: bold;\
		font-size: 1.1em;\
		line-height: 23px;\
		text-align: right;\
	}\
\
	.url-field {\
		border-width: 1px;\
		padding: 2px;\
		height: 17px;\
	}' );

// Get mobile URL
mobileUrl = mp4Url.replace( /\/\/giant/, '//thumbs' ).replace( /\.mp4$/, '-mobile.mp4' );


// URL button
urlBtn.id = 'url-btn';
urlBtn.className = 'url-btn';
urlBtn.textContent = 'URL';
urlBtn.onclick = function() {
	this.classList.toggle( 'active' );
	urlsContainer.classList.toggle( 'active' );
}

shareContainer.appendChild( urlBtn );

// URLs Container
urlsContainer.className = 'urls-container';
shareContainer.appendChild( urlsContainer );

//Add URL Listings
addUrlListing( 'GIF', gifUrl );
addUrlListing( 'WebM', webmUrl );
addUrlListing( 'MP4', mp4Url );

if ( mobileUrl ) {
	addUrlListing( 'Mobile (MP4)', mobileUrl );
}

// Create and append URL/description into URLs container
function addUrlListing( type, url ) {
	var typeLc     = type.toLowerCase().replace( /[^a-z0-9 ]/g, '' ).replace( ' ', '-' ),
		urlListing = document.createElement( 'div' ),
		urlLabel   = document.createElement( 'label' ),
		urlField   = document.createElement( 'input' );

	urlLabel.setAttribute( 'for', typeLc + '-url-field' );
	urlLabel.className   = 'url-label';
	urlLabel.textContent = type + ':';

	urlField.id          = typeLc + '-url-field';
	urlField.className   = 'url-field ' + typeLc + '-url-field';
	urlField.value       = url;
	urlField.setAttribute( 'readonly', 'readonly' );

	urlListing.className = 'url-listing ' + typeLc + '-url';
	urlListing.appendChild( urlLabel );
	urlListing.appendChild( urlField ); 

	urlsContainer.appendChild( urlListing );

	urlField.onclick = function() {
		this.focus();
		this.select();
	};
}
