// ==UserScript==
// @name inc-dec
// @namespace Violentmonkey Scripts
// @updateURL https://laurentrogez.github.io/inc-dec/inc-dec.user.js
// @match *://*/*
// @version 0.1.3.1
// @grant none
// ==/UserScript==
// 

// Cool

document.onkeypress=function (e) { 
	e=e || window.event; 
	var charCode=e.charCode || e.keyCode, 
	character=String.fromCharCode(charCode); 
	
	if(charCode==37) { c=-1; url(); }
  	
	if(charCode==39) { c=1; url();}
}


function url(){
  
	locTab=document.location.href.split('/');
  
  file=locTab.pop().split('.');
	fileUrlBase=locTab.join('/');
  name=file[0];
	ext=file[1];
	nameTab=name.split('');
  
	number="";
	for ( a=nameTab.length-1; a>=0; a--) {

		item=Math.abs(nameTab[a]); 
    
		if (  Number.isInteger(item) ) { number=item+number; }

		if ( !Number.isInteger(item) && number!="" ) break;
	}
  	
	if ( number==1 && c==-1 ) { return;} // ne pas aller sous 1
  
	nameTab=name.split(number);
  
	nameTabLastItem=nameTab.pop(); // Eventuel(s) caractère(s) après number, ex : une parenthèse
  
	numberNew=Math.abs(number)+c;
  
	nameNew=nameTab.join(number)+numberNew;
  
	urlNew=fileUrlBase+"/"+nameNew+nameTabLastItem+"."+ext; // Reconstruction de l'url modifié
 
	window.location=urlNew;
}


