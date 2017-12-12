// ==UserScript==
// @name inc-dec
// @namespace Violentmonkey Scripts
// @updateURL https://laurentrogez.github.io/inc-dec/inc-dec.user.js
// @match *://*/*
// @version 0.3
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
  	
	if ( number==1 && c==-1 ) { return;} // ne pas décrémenter sous 1.jpg
  
  
  
  d=number.length; // Compter les décimales avec les zéros (0123)
  
  e=String(Math.abs(number)).length; // Compter les décimales sans les zéros (123)
  
  f=d-e; // Le nombre de zéros

  // DEC
  if ( c==-1 ) {
            
    g=String(Math.abs(number)).replace(/0/g,""); // converti 10, 100, 1000 etc. en 1
  
    if ( g==1 ) { f=f+1; }
  }
  
  // INC
  if ( c==1 ) {
        
    g=String(Math.abs(number)).replace(/9/g,""); // converti 9, 99, 999 etc. en ""
    
    if ( g=="" )f=f-1;

  }
  
  zero="";
  for (z=0; z<f; z++) {
    zero=zero+"0";
  }
  
  
	nameTab=name.split(number); // Split sur le nombre trouvé
  
	nameTabLastItem=nameTab.pop(); // Suppression et stockage des éventuels caractères après number, ex : le nombre entre parenthèse
  
	numberNew=Math.abs(number)+c; // Le nouveau nombre incrémenté ou décrémenté
  
	nameNew=nameTab.join(number)+zero+numberNew; // Le nouveau nom de fichier
  
	urlNew=fileUrlBase+"/"+nameNew+nameTabLastItem+"."+ext; // Reconstruction de l'url modifié
 
  
  UrlExists(urlNew); // GO
    
}

// Teste si l'URL existe
function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 404)
        window.location=urlNew;
    else
        window.location.reload();
}

