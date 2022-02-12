import logo from './logo.svg';
import './App.css';
import anime from 'animejs/lib/anime.es.js';
import { Center, Button, Text, Input, Flex, Select, Grid, GridItem, Box } from "@chakra-ui/react";
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
let currCipher="";

function App() {
  return (
    <>
      <Flex mt={10} justify={"center"}>
      
        <Select placeholder='Select Cipher' id="cipher" onChange={changeCipher} w={"150px"}>
          <option value='Caesar Cipher'>Caesar Cipher</option>
          <option value='Vigenere'>Vigenère</option>
        </Select>

      </Flex>
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



      <Box opacity={0} height={0} id="Caesar" position="absolute" mx={"auto"} w={"90vw"}>
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
          <Text align={"center"} className={"alphaLetter"} id={"a"}>a</Text>
          <Text align={"center"} className={"alphaLetter"} id={"b"}>b</Text>
          <Text align={"center"} className={"alphaLetter"} id={"c"}>c</Text>
          <Text align={"center"} className={"alphaLetter"} id={"d"}>d</Text>
          <Text align={"center"} className={"alphaLetter"} id={"e"}>e</Text>
          <Text align={"center"} className={"alphaLetter"} id={"f"}>f</Text>
          <Text align={"center"} className={"alphaLetter"} id={"g"}>g</Text>
          <Text align={"center"} className={"alphaLetter"} id={"h"}>h</Text>
          <Text align={"center"} className={"alphaLetter"} id={"i"}>i</Text>
          <Text align={"center"} className={"alphaLetter"} id={"j"}>j</Text>
          <Text align={"center"} className={"alphaLetter"} id={"k"}>k</Text>
          <Text align={"center"} className={"alphaLetter"} id={"l"}>l</Text>
          <Text align={"center"} className={"alphaLetter"} id={"m"}>m</Text>
          <Text align={"center"} className={"alphaLetter"} id={"n"}>n</Text>
          <Text align={"center"} className={"alphaLetter"} id={"o"}>o</Text>
          <Text align={"center"} className={"alphaLetter"} id={"p"}>p</Text>
          <Text align={"center"} className={"alphaLetter"} id={"q"}>q</Text>
          <Text align={"center"} className={"alphaLetter"} id={"r"}>r</Text>
          <Text align={"center"} className={"alphaLetter"} id={"s"}>s</Text>
          <Text align={"center"} className={"alphaLetter"} id={"t"}>t</Text>
          <Text align={"center"} className={"alphaLetter"} id={"u"}>u</Text>
          <Text align={"center"} className={"alphaLetter"} id={"v"}>v</Text>
          <Text align={"center"} className={"alphaLetter"} id={"w"}>w</Text>
          <Text align={"center"} className={"alphaLetter"} id={"x"}>x</Text>
          <Text align={"center"} className={"alphaLetter"} id={"y"}>y</Text>
          <Text align={"center"} className={"alphaLetter"} id={"z"}>z</Text>
        </Flex>
        <Flex mt={"150px"} w={"100%"} direction={"column"} align={"center"}>
            

            <Flex direction={"row"}>
              <Input placeholder='What do you want to encrypt?' id="encryptValCaesar" w={"600px"} maxW={"600px"}/>
              <NumberInput size='md' maxW={24} defaultValue={0} max={26} min={-26}>
                <NumberInputField id="step"/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Button colorScheme='green' w={"80px"} onClick={encrypt} top={5}>Encrypt</Button>
          </Flex> 
      </Box>
      <Center id="encryptedResult" w={"100%"} position={"absolute"}></Center>
      
      <Flex mx={10} justify="space-around" visibility={"hidden"} id="Vigenere" position={"relative"} opacity={0} mt={"120px"}>
        
          
        <Flex h={0}>
          <Grid templateRows="repeat(26, 24px)" templateColumns="repeat(1, 28px)" id="leftgrid"  mr={5}></Grid>
          <Box>
            <Grid templateColumns="repeat(26, 28px)"  templateRows="repeat(1, 26px)" id="topgrid" bottom={"140px"} position="absolute"></Grid>
            <Grid justify={"center"} templateRows="repeat(26, 24px)" templateColumns="repeat(26, 28px)" id="grid"></Grid>
          </Box>
        </Flex>


        <Flex w={"20vw"} direction="column">
          <Input placeholder='Enter Key' id="vigenereKey"/>
          <Input placeholder='What do you want to encrypt?' id="encryptValVigenere"/>
          <Button colorScheme='green' onClick={encrypt}>Encrypt</Button>
        </Flex> 
      </Flex>
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

function changeCipher(){
  const val = document.getElementById("cipher").value;
  if (val=="Caesar Cipher"){
    if (currCipher!="Caesar Cipher"){
      vigenereHide();
      caesarStart();
      
      return;
    }
  }else if (val=="Vigenere"){
    if (currCipher!="Vigenere"){
      caesarHide();
      vigenereStart();
      
      return;
    }
  }
}

function caesarStart(){
  document.getElementById("Caesar").style.visibility= 'visible';
  anime({
    targets: '#Caesar',
    translateY: 10,
    opacity: 1,
    height: "100%",
    easing: 'easeInOutQuad',
    visibility: "visible"
  });
};

function caesarHide(){

  anime({
    targets: "#Caesar",
    translateY: -10,
    opacity: 0,
    height: 0,
    easing:"easeInOutQuad",
    visibility: "hidden"
  }).finished.then(document.getElementById("Caesar").style.visibility= 'hidden')
}

function vigenereStart(){
  document.getElementById("Vigenere").style.visibility= 'visible';
  anime({
    targets: "#Vigenere",
    translateY: 10,
    opacity: 1,
    height: "100%",
    easing: "easeInOutQuad"
  })
}

function vigenereHide(){
  
  anime({
    targets: "#Vigenere",
    translateY: -10,
    opacity: 0,
    height: 0,
    easing: "easeInOutQuad",
    display: "none"
  }).finished.then(document.getElementById("Vigenere").style.visibility= 'hidden')
}

//Calls the correct encryption cipher
function encrypt(){
  const cipher = document.getElementById("cipher").value;

  let text="";
  if (cipher=="Caesar Cipher"){
    text=document.getElementById("encryptValCaesar").value;
    addText(text);

    currCipher="Caesar Cipher";
    caesarCipher(text);
  }else if (cipher=="Vigenere"){
    text=document.getElementById("encryptValVigenere").value;
    addText(text);

    currCipher = "Vigenere";
    vigenereCipher(text);
  }
}


//Adds the text that is going to be encrypted onto the screen
function addText(text){
  
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
