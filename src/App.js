import logo from './logo.svg';
import './App.css';
import anime from 'animejs/lib/anime.es.js';
import { Center, Button, Text, Input, Flex, Select} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import { ChevronDownIcon  } from '@chakra-ui/icons'
import { animationControls } from 'framer-motion';

import {caesarCipher} from "./ciphers/caesar"
import { vigenereCipher } from "./ciphers/vigenere"

let toEncrypt="";
const alphabet="abcdefghijklmnopqrstuvwxyz";
let finalEncrypted="";

function App() {
  return (
    <>
      <Flex>
        <Input placeholder='What do you want to encrypt?' id="encryptVal"/>

        <Select placeholder='Select Cipher' id="cipher">
          <option value='Caesar Cipher'>Caesar Cipher</option>
          <option value='Vigenere'>Vigenère</option>
        </Select>


        <NumberInput size='md' maxW={24} defaultValue={0} max={26} min={-26}>
          <NumberInputField id="step"/>
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      
      

      <Button colorScheme='blue' id="encryptBtn" onClick={encrypt}>Encrypt</Button>

      <Flex w={"100%"} id="maintext" justify={"center"}>
        
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

      <Flex w={"100%"} className={"alpha"} position={"relative"} top={"60px"} justify={"center"}>
        <div id="double-arrow"></div>
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

      <Flex w={"100%"} id={"alpha"} className={"alpha"} position={"relative"} top={"-10px"} justify={"center"}>
        <Text className={"alphaLetter"} id={"a"}>a</Text>
        <Text className={"alphaLetter"} id={"b"}>b</Text>
        <Text className={"alphaLetter"} id={"c"}>c</Text>
        <Text className={"alphaLetter"} id={"d"}>d</Text>
        <Text className={"alphaLetter"} id={"e"}>e</Text>
        <Text className={"alphaLetter"} id={"f"}>f</Text>
        <Text className={"alphaLetter"} id={"g"}>g</Text>
        <Text className={"alphaLetter"} id={"h"}>h</Text>
        <Text className={"alphaLetter"} id={"i"}>i</Text>
        <Text className={"alphaLetter"} id={"j"}>j</Text>
        <Text className={"alphaLetter"} id={"k"}>k</Text>
        <Text className={"alphaLetter"} id={"l"}>l</Text>
        <Text className={"alphaLetter"} id={"m"}>m</Text>
        <Text className={"alphaLetter"} id={"n"}>n</Text>
        <Text className={"alphaLetter"} id={"o"}>o</Text>
        <Text className={"alphaLetter"} id={"p"}>p</Text>
        <Text className={"alphaLetter"} id={"q"}>q</Text>
        <Text className={"alphaLetter"} id={"r"}>r</Text>
        <Text className={"alphaLetter"} id={"s"}>s</Text>
        <Text className={"alphaLetter"} id={"t"}>t</Text>
        <Text className={"alphaLetter"} id={"u"}>u</Text>
        <Text className={"alphaLetter"} id={"v"}>v</Text>
        <Text className={"alphaLetter"} id={"w"}>w</Text>
        <Text className={"alphaLetter"} id={"x"}>x</Text>
        <Text className={"alphaLetter"} id={"y"}>y</Text>
        <Text className={"alphaLetter"} id={"z"}>z</Text>
      </Flex>
      <Center id="resultText" width={"100%"} top={500} position="absolute">

      </Center>   
    </>
  );
}


//Gets the x locations of each letter
const xLocations=[];
document.addEventListener('DOMContentLoaded', (event) => {
  
  const oldLetters = document.getElementsByClassName("oldAlphaLetter");
  for (let i=0; i<oldLetters.length; i++){
    xLocations.push(oldLetters[i].getBoundingClientRect().left);
  }
})

export { xLocations };

//Calls the correct encryption cipher
function encrypt(){
  const cipher = document.getElementById("cipher").value;
  toEncrypt = document.getElementById("encryptVal").value;

  addText();

  if (cipher=="Caesar Cipher"){
    caesarCipher(toEncrypt);
  }else if (cipher=="Vigenere"){
    vigenereCipher(toEncrypt);
  }
}


//Adds the text that is going to be encrypted onto the screen
function addText(){
  const text = document.getElementById("encryptVal").value;
  
  if (text.length<=0){
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
    toAdd.id = i;
    toAdd.append(document.createTextNode(newLetter));
    toAdd.classList.add("letter");

    centerText.appendChild(toAdd);
  }
}


export default App;
