import anime from 'animejs/lib/anime.es.js';
import { xLocations } from "../App.js";

let finalEncrypted="";
let shift=0;
const alphabet="abcdefghijklmnopqrstuvwxyz";
let toEncrypt="";

//****CAESAR CIPHER****
export function caesarCipher(encrypt){
  document.getElementById("caesarBtn").disabled=true;
  toEncrypt=encrypt;
  clearText();

  //Creates a new alphabet
  shift = document.getElementById("step").value;
  if (shift<0){
    shift=26+Number(shift);
  }
  finalEncrypted=getEncryptedText();
  moveAlphabet();
  animateArrowAndUnderline();
  clearUnderline();
}

//Calculates the encrypted text
function getEncryptedText(){
    const newAlphabet= alphabet.substring(alphabet.length-shift) + alphabet.substring(0, alphabet.length-shift);
  
    let encryptedText="";
    for (let i=0; i<toEncrypt.length; i++){
      
      if (!toEncrypt[i].match(/[a-z]/i)){
        encryptedText+=toEncrypt[i];
      }
  
       let index = alphabet.indexOf(toEncrypt[i].toLowerCase());
  
       let toAdd=newAlphabet.substring(index, index+1);
       if (toEncrypt[i]==toEncrypt[i].toUpperCase()){
         toAdd=toAdd.toUpperCase();
       }
       console.log(toAdd);
       encryptedText+=toAdd;
    }
    console.log(encryptedText);
    console.log(toEncrypt);
    console.log(newAlphabet)
    return encryptedText;
  }


//Animates the letters of the alphabet
function moveAlphabet(){

    const letters=document.getElementsByClassName("alphaLetter");
    for (let i=0; i<letters.length; i++){
  
      const xDiff = xLocations[(i+Number(shift))%26] -  xLocations[i];
      
      anime({
        targets: "#"+alphabet.substring(i, i+1),
        translateY: [0, 150],
        translateX: [0, xDiff],
        easing: 'easeInOutExpo',
        delay: i * 50
      })
    }
  }

//Clears all the underlines
function clearUnderline(){
    for (let i=0; i<toEncrypt.length; i++){
        document.getElementById(i).style.textDecoration = "none"; 
    }
}

//Clears the previous encrypted result
function clearText(){
    let toRemove = document.getElementsByClassName("finalEncrypted");
    for (let i=toRemove.length-1; i>=0 ;i--){
      toRemove[i].remove();
    }
}

//Animates the arrow and the underline
function animateArrowAndUnderline(){
  
  setTimeout(() => {  
    underlineText(0);
    moveArrow(0);
  }, 2300); 
}

//Moves the arrow
function moveArrow(i){
  document.getElementById("double-arrow").style.opacity = "1";

  const toFind = toEncrypt.substring(i, i+1).toLowerCase();
  const index = alphabet.indexOf(toFind);
  let xDiff=0;
  if (index>=0){
    xDiff = xLocations[index] - document.getElementById("double-arrow").getBoundingClientRect().x;
    
    anime({
      targets: '#double-arrow',
      translateX: xLocations[index],
      easing:  'easeInOutQuad'
    });
    

    const toAdd=document.createElement("p");
    toAdd.className = "finalEncrypted";
    toAdd.append(document.createTextNode(finalEncrypted.substring(i, i+1)));

    document.getElementById("encryptedResult").appendChild(toAdd);

  }
}

//Underlines each letter in order
function underlineText(index){
  if (index>=toEncrypt.length){
    document.getElementById("caesarBtn").disabled=false;
    return;
  }
  
  document.getElementById(index).style.textDecoration = "underline 4px red";
 
  setTimeout(() => {  
    document.getElementById(index).style.textDecoration = "none"; 
    
    underlineText(index+1);
    moveArrow(index+1);
    
  }, 1500);
}