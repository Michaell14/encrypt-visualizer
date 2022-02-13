import anime from 'animejs/lib/anime.es.js';

let toEncrypt="";
const alphabet="abcdefghijklmnopqrstuvwxyz";
let finalEncrypted="";

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
    document.getElementById("vigenereBtn").disabled=true;
    clearText();
    toEncrypt=encrypt;
    key= document.getElementById("vigenereKey").value;
    key = key.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '');

    encryptText();
    animateHighlight();
}

function encryptText(){
    
    const grid =document.getElementById("grid");
    finalEncrypted="";
    for (let i=0; i<toEncrypt.length; i++){
        const index1=alphabet.indexOf(toEncrypt.substring(i, i+1));
        const index2=alphabet.indexOf(key.substring(i%key.length, (i%key.length)+1));
        console.log(key.substring(i%key.length, (i%key.length)+1));

        const newIndex = index1*26 + index2;

        console.log(newIndex);
        finalEncrypted +=grid.children[newIndex].innerHTML;
        
        
    }
    animateUnderline();
}


function animateHighlight(){
    const grid= document.getElementById("grid");
    const leftAlphabet = document.getElementById("leftgrid");
    const topAlphabet=document.getElementById("topgrid");
    
    var horizontalColor = anime.timeline({
        duration: 3000
       
    })
    var verticalColor = anime.timeline({
        duration: 3000
    })

    var greenColor = anime.timeline({
        duration: 3000,
        complete: function(anim){{
            document.getElementById("vigenereBtn").disabled=false;
        }},
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
        //const upperLimit = lcm(horizontalArr.length, verticalArr.length);
        const upperLimit = 2677.11444
        horizontalColor.add({
            targets: horizontalArr,
           
            delay: anime.stagger(upperLimit/(horizontalArr.length-1)),
            
            keyframes: [
                {backgroundColor: "#C03F4A"},
                {backgroundColor: "rgba(192, 63, 74, 0)"}
              ],
        })

        verticalColor.add({
            targets: verticalArr,
            delay: anime.stagger(upperLimit/(verticalArr.length-1)),
            
            keyframes: [
                {backgroundColor: "#C03F4A"},
                {backgroundColor: "rgba(192, 63, 74, 0)"}
              ],
        })

       greenColor.add({
            targets: grid.children[index2 + index1*26],
            delay: upperLimit,
            keyframes: [
                {backgroundColor: "#33CC4C"},
                {backgroundColor: "rgba(51, 204, 76, 0)"}
              ],
        })
    }   
}


function animateUnderline(){
    setTimeout(() => {  
        underlineText(0);
        addText(0);
      }, 3000); 
}

//Underlines each letter in order
function underlineText(index){
    if (index>=toEncrypt.length){
        return;
    }

    document.getElementById(index).style.textDecoration = "underline 4px red dotted";

    setTimeout(() => {  
        document.getElementById(index).style.textDecoration = "none"; 
        underlineText(index+1);
        
    }, 5677.11444);
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
        addText(index+1);
        
    }, 5677.11444);
}


//Clears the previous encrypted result
function clearText(){
    let toRemove = document.getElementsByClassName("finalEncrypted");
    for (let i=toRemove.length-1; i>=0 ;i--){
      toRemove[i].remove();
    }
}