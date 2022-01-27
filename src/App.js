import logo from './logo.svg';
import './App.css';
import { Center, Button, Text, Input, Flex } from "@chakra-ui/react";


function App() {
  return (
    <>
      <Input placeholder='What do you want to encrypt?' id="encryptVal" isDisabled={false}/>
      <Button colorScheme='blue' onClick={addText}>Encrypt</Button>

      <Flex w={"100%"} id="maintext" position={"absolute"} top={"40vh"} justify={"center"}>
        <Text fontSize={"5xl"}>M</Text>
        <Text fontSize={"5xl"}>a</Text>
        <Text fontSize={"5xl"}>i</Text>
        <Text fontSize={"5xl"}>n</Text>
      </Flex>

    </>
  );
}

function addText(){
  const text = document.getElementById("encryptVal").value;
  
  if (document.getElementById("encryptVal").isDisabled || text.length<=0){
    return;
  }
  document.getElementById("maintext").innerHTML="";
  const center = document.getElementById("maintext");
  for (let i=0; i<text.length; i++){
    const newLetter=text.substring(i, i+1);
    if (newLetter==" "){
      document.getElementById("maintext").innerHTML+=`&nbsp;&nbsp;&nbsp;`;
    }
    const letter= document.createTextNode(newLetter);
    const toAdd=document.createElement("p");

    //Adding text to the center of the screen
    toAdd.append(letter);
    toAdd.classList.add("letter");

    setInterval(animateText(toAdd), 1000);

    center.appendChild(toAdd);
  }

  //Disables the input field
  document.getElementById("encryptVal").isDisabled=false;
}

function animateText(letter){
  letter.className+=" animate";
}

export default App;
