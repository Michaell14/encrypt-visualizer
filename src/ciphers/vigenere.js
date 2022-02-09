import { ColorModeProvider } from '@chakra-ui/react';
import anime from 'animejs/lib/anime.es.js';
import { animationControls } from 'framer-motion';

let toEncrypt="";
const alphabet="abcdefghijklmnopqrstuvwxyz";
let finalEncrypted="";
let underline=true;
var horizontalColor = anime.timeline({
})
var verticalColor = anime.timeline({
})

document.addEventListener('DOMContentLoaded', (event) => {
    const grid = document.getElementById("grid");
    const topgrid=document.getElementById("topgrid");
    const leftgrid=document.getElementById("leftgrid");

    let offset=0;
    for (let i=0; i<26; i++){
        for (let x=0; x<26; x++){
            createNode((x+offset)%26, "grid", grid);
        }

        createNode(i, "topgridletter", topgrid);
        createNode(i, "leftgridletter", leftgrid);
        offset++;
    }

})



function createNode(index, classname, parent){
    const toAdd=document.createElement("p");
    toAdd.appendChild(document.createTextNode(alphabet.substring(index, index+1)));
    toAdd.classList.add(classname);
    parent.appendChild(toAdd);
}
let key="";

export function vigenereCipher(encrypt){
    resetGrid();
    clearText();
    toEncrypt=encrypt;
    key= document.getElementById("vigenereKey").value;
    key = key.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '');

    encryptText();
    animateHighlight();
}

function resetGrid(){
    verticalColor.restart()
    horizontalColor.restart()
    anime.remove(".grid topgrid leftgrid")
    
    anime.remove(".grid topgrid leftgrid");
    
}

function encryptText(){
    
    const grid =document.getElementById("grid");
    for (let i=0; i<toEncrypt.length; i++){
        const index1=alphabet.indexOf(toEncrypt.substring(i, i+1));
        const index2=alphabet.indexOf(key.substring(i%key.length, (i%key.length)+1));
        const newIndex = index1*26 + index2;
       
        finalEncrypted +=grid.children[newIndex].innerHTML;
        
        
    }
    animateUnderline();
}

//Finds the greatest common denominator between two numbers
function gcd(num1, num2){
  
    //Loop till both numbers are not equal
    while(num1 != num2){
      
      //check if num1 > num2
      if(num1 > num2){
        //Subtract num2 from num1
        num1 = num1 - num2;
      }else{
        //Subtract num1 from num2
        num2 = num2 - num1;
      }
    }
    
    return num2;
}

//Finds the least common multiple of two numbers
function lcm(num1, num2){
    let gcdVal = gcd(num1, num2);
    let toReturn = (num1*num2)/gcdVal;

    return Math.floor((2000-toReturn)/toReturn) * (toReturn+1);
}


function animateHighlight(){
    const grid= document.getElementById("grid");
    const leftAlphabet = document.getElementById("leftgrid");
    const topAlphabet=document.getElementById("topgrid");
    
    horizontalColor = anime.timeline({
    })
    verticalColor = anime.timeline({
    })


    for (let i=0; i<toEncrypt.length; i++){
       
        const index1=alphabet.indexOf(toEncrypt.substring(i, i+1));
        const index2=alphabet.indexOf(key.substring(i%key.length, (i%key.length)+1));


        const horizontalArr=[leftAlphabet.children[index1]];
        const verticalArr=[topAlphabet.children[index2]];
        for (let i=26*index1; i<26*index1+index2; i++){
            horizontalArr.push(grid.children[i]);
        }

        for (let i=0; i<index1; i++){
            verticalArr.push(grid.children[index2 + i*26]);
        }
        const upperLimit = lcm(horizontalArr.length, verticalArr.length);

        horizontalColor.add({
            targets: horizontalArr,
           
            delay: anime.stagger(upperLimit/horizontalArr.length),
            keyframes: [
                {backgroundColor: "#E1341E"},
                {backgroundColor: "#1A202C"}
              ],
            
        })

        verticalColor.add({
            targets: verticalArr,
           /* delay: anime.stagger(2000/verticalArr.length),*/
           delay: anime.stagger(upperLimit/verticalArr.length),
            keyframes: [
                {backgroundColor: "#E1341E"},
                {backgroundColor: "#1A202C"}
              ],
        })
    }   
}


function animateUnderline(){
    underline=false;
    setTimeout(() => {  
        underline=true;
        underlineText(0);
        addText(0);
      }, 2300); 
}

//Underlines each letter in order
function underlineText(index){
    if (index>=toEncrypt.length){
        return;
    }

    document.getElementById(index).style.textDecoration = "underline 4px red dotted";

    setTimeout(() => {  
        document.getElementById(index).style.textDecoration = "none"; 
        if (underline){
        underlineText(index+1);
        }
    }, 1500);
}

function addText(index){   
    if (index>=toEncrypt.length){
        return;
    }
    const parent= document.getElementById("encryptedResult");
    const toAdd=document.createElement("p");
    toAdd.className = "finalEncrypted";
    toAdd.appendChild(document.createTextNode(finalEncrypted.substring(index, index+1)));
    parent.appendChild(toAdd);
    setTimeout(() => {
        if (underline){
            addText(index+1);
        }
    }, 1500);
}


//Clears the previous encrypted result
function clearText(){
    let toRemove = document.getElementsByClassName("finalEncrypted");
    for (let i=toRemove.length-1; i>=0 ;i--){
      toRemove[i].remove();
    }
}