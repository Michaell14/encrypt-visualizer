import logo from './logo.svg';
import './App.css';
import { Center, Button, Text, Input, Flex, Select} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import { ChevronDownIcon  } from '@chakra-ui/icons'

let toEncrypt="";
let alphaPos=[];
const alphabet="abcdefghijklmnopqrstuvwxyz";

function App() {
  return (
    <>
      <Flex>
        <Input placeholder='What do you want to encrypt?' id="encryptVal" isDisabled={false}/>

        <Select placeholder='Select Cipher' id="cipher">
          <option value='Caesar Cipher'>Caesar Cipher</option>
          <option value='Grille'>Grille</option>
          <option value='Morbit'>Morbit</option>
        </Select>


        <NumberInput size='md' maxW={24} defaultValue={0} max={26} min={-26}>
          <NumberInputField id="step"/>
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      
        

      <Button colorScheme='blue' onClick={encrypt}>Encrypt</Button>
      <Flex w={"100%"} className={"alpha"} position={"absolute"} top={"20vh"} justify={"center"}>
        <Text className={"oldAlphaLetter"}>a</Text>
        <Text className={"oldAlphaLetter"}>b</Text>
        <Text className={"oldAlphaLetter"}>c</Text>
        <Text className={"oldAlphaLetter"}>d</Text>
        <Text className={"oldAlphaLetter"}>e</Text>
        <Text className={"oldAlphaLetter"}>f</Text>
        <Text className={"oldAlphaLetter"}>g</Text>
        <Text className={"oldAlphaLetter"}>h</Text>
        <Text className={"oldAlphaLetter"}>i</Text>
        <Text className={"oldAlphaLetter"}>j</Text>
        <Text className={"oldAlphaLetter"}>k</Text>
        <Text className={"oldAlphaLetter"}>l</Text>
        <Text className={"oldAlphaLetter"}>m</Text>
        <Text className={"oldAlphaLetter"}>n</Text>
        <Text className={"oldAlphaLetter"}>o</Text>
        <Text className={"oldAlphaLetter"}>p</Text>
        <Text className={"oldAlphaLetter"}>q</Text>
        <Text className={"oldAlphaLetter"}>r</Text>
        <Text className={"oldAlphaLetter"}>s</Text>
        <Text className={"oldAlphaLetter"}>t</Text>
        <Text className={"oldAlphaLetter"}>u</Text>
        <Text className={"oldAlphaLetter"}>v</Text>
        <Text className={"oldAlphaLetter"}>w</Text>
        <Text className={"oldAlphaLetter"}>x</Text>
        <Text className={"oldAlphaLetter"}>y</Text>
        <Text className={"oldAlphaLetter"}>z</Text>

      </Flex>
      <Flex w={"100%"} id={"alpha"} className={"alpha"} position={"absolute"} top={"20vh"} justify={"center"}>
      <Text className={"alphaLetter"}>a</Text>
        <Text className={"alphaLetter"}>b</Text>
        <Text className={"alphaLetter"}>c</Text>
        <Text className={"alphaLetter"}>d</Text>
        <Text className={"alphaLetter"}>e</Text>
        <Text className={"alphaLetter"}>f</Text>
        <Text className={"alphaLetter"}>g</Text>
        <Text className={"alphaLetter"}>h</Text>
        <Text className={"alphaLetter"}>i</Text>
        <Text className={"alphaLetter"}>j</Text>
        <Text className={"alphaLetter"}>k</Text>
        <Text className={"alphaLetter"}>l</Text>
        <Text className={"alphaLetter"}>m</Text>
        <Text className={"alphaLetter"}>n</Text>
        <Text className={"alphaLetter"}>o</Text>
        <Text className={"alphaLetter"}>p</Text>
        <Text className={"alphaLetter"}>q</Text>
        <Text className={"alphaLetter"}>r</Text>
        <Text className={"alphaLetter"}>s</Text>
        <Text className={"alphaLetter"}>t</Text>
        <Text className={"alphaLetter"}>u</Text>
        <Text className={"alphaLetter"}>v</Text>
        <Text className={"alphaLetter"}>w</Text>
        <Text className={"alphaLetter"}>x</Text>
        <Text className={"alphaLetter"}>y</Text>
        <Text className={"alphaLetter"}>z</Text>
      </Flex>

      <Flex w={"100%"} id="maintext" position={"absolute"} top={"40vh"} justify={"center"}>
        <Text fontSize={"5xl"}>E</Text>
        <Text fontSize={"5xl"}>n</Text>
        <Text fontSize={"5xl"}>c</Text>
        <Text fontSize={"5xl"}>r</Text>
        <Text fontSize={"5xl"}>y</Text>
        <Text fontSize={"5xl"}>p</Text>
        <Text fontSize={"5xl"}>t</Text>
        <Text fontSize={"5xl"}>a</Text>
        <Text fontSize={"5xl"}>b</Text>
        <Text fontSize={"5xl"}>l</Text>
        <Text fontSize={"5xl"}>e</Text>
      </Flex>

    </>
  );
}

function encrypt(){
  addText();
  const cipher = document.getElementById("cipher").value;
  if (cipher=="Caesar Cipher"){
    caesarCipher();
  }else if (cipher=="Grille"){

  }
}

//Animates the letters of the alphabet
function moveAlphabet(shift){

  const oldLetters = document.getElementsByClassName("oldAlphaLetter");
  const xLocations=[];
  for (let i=0; i<oldLetters.length; i++){
    var rect=oldLetters[i].getBoundingClientRect();
    xLocations.push(rect.left);
  }

  
  const letters=document.getElementsByClassName("alphaLetter");
  for (let i=0; i<letters.length; i++){
    /*console.log(i+Number(shift));
    console.log(xLocations[(i+Number(shift))%26]);
    console.log( letters[i].getBoundingClientRect().left);*/
    let xLoc = xLocations[(i+Number(shift))%26] -  letters[i].getBoundingClientRect().left;
   //console.log(xLoc);
    letters[i].animate([
      {transform: `translateX(${xLoc}px) translateY(45px)`}
      
    ],{
      duration: 1000,
      fill: 'forwards'
    })
  }
}

function createNewAlphabet(){
  const alpha = document.getElementById("alpha");
  const toRemove = document.getElementsByClassName("alphaLetter");
  for (let i=0; i<toRemove.length; i++){
    toRemove[i].className="alphaLetter";
  }
  /*
  for (let i=0; i<toRemove.length; i++){
    document.getElementById(toRemove[i].id).remove();
  }

  for (let i=0; i<alphabet.length; i++){
    const newLetter = document.createElement("p");
    newLetter.id=alphabet.substring(i, i+1);
    newLetter.className="alphaLetter";
    newLetter.innerHTML=alphabet.substring(i, i+1);
    alpha.appendChild(newLetter);
  }*/
}

function addText(){
  const text = document.getElementById("encryptVal").value;
  
  if (document.getElementById("encryptVal").isDisabled || text.length<=0){
    return;
  }
  const centerText = document.getElementById("maintext");
  centerText.innerHTML="";
  for (let i=0; i<text.length; i++){
    const newLetter=text.substring(i, i+1);
    if (newLetter==" "){
      centerText.innerHTML+=`&nbsp;`;
    }

    //Adding text to the center of the screen
    const toAdd=document.createElement("p");
    toAdd.append(document.createTextNode(newLetter));
    toAdd.classList.add("letter");

    centerText.appendChild(toAdd);
  }

  //Disables the input field
  document.getElementById("encryptVal").isDisabled=false;
}


function caesarCipher(){

  let encryptedText="";

  //Creates a new alphabet
  let shift = document.getElementById("step").value;
  if (shift<0){
    shift=26+Number(shift);
  }
  const newAlphabet= alphabet.substring(shift) + alphabet.substring(0, shift);
  createNewAlphabet();
  //moveAlphabet(shift);

  for (let i=0; i<toEncrypt.length; i++){
    if (toEncrypt[i]==" "){
      encryptedText+=" ";
    }

     let index = alphabet.indexOf(toEncrypt[i].toLowerCase());

     let toAdd=newAlphabet.substring(index, index+1);
     if (toEncrypt[i]==toEncrypt[i].toUpperCase()){
       toAdd=toAdd.toUpperCase();
     }
     encryptedText+=toAdd;
  }
}

export default App;
