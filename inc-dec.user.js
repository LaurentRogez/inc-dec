// ==UserScript==
// @name inc-dec
// @namespace Violentmonkey Scripts
// @updateURL https://laurentrogez.github.io/inc-dec/inc-dec.user.js
// @match *://*/*
// @version 0.2
// @grant none
// ==/UserScript==
// 

// INC-DEC

// Détection du code clavier
document.onkeypress=function (e) { 
	e=e || window.event; 
	var charCode=e.charCode || e.keyCode, 
	character=String.fromCharCode(charCode); 
	
	if(charCode==37) { c=-1; urlNew(); } // DEC
  	
	if(charCode==39) { c=1; urlNew();}	// INC
}


function urlNew(){
  
	// Décomposition de location
	locTab=document.location.href.split('/');
	file=locTab.pop().split('.');
	fileUrlBase=locTab.join('/');
	name=file[0];
	ext=file[1];
	nameTab=name.split('');
  
	// Le nombre le plus à droite
	number="";
	for ( a=nameTab.length-1; a>=0; a--) {

		item=Math.abs(nameTab[a]); 
    
		if (  Number.isInteger(item) ) { number=item+number; } // Si item est un chiffre alors on concataine

		if ( !Number.isInteger(item) && number!="" ) break; // Stop si item n'est pas un chiffre avant le nombre trouvé
	}
  	
	if ( number==1 && c==-1 ) { return;} // ne pas décrémenter sous 1
  
	nameTab=name.split(number); // Split sur le nombre trouvé
  
	nameTabLastItem=nameTab.pop(); // Suppression et stockage des éventuels caractères après number, ex : le nombre entre parenthèse
  
	numberNew=Math.abs(number)+c; // Le nouveau nombre incrémenté ou décrémenté
  
	nameNew=nameTab.join(number)+numberNew; // Le nouveau nom de fichier
  
	urlNew=fileUrlBase+"/"+nameNew+nameTabLastItem+"."+ext; // Reconstruction de l'url modifié
 
	window.location=urlNew; // Go
}


