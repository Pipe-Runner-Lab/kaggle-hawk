import React, {useEffect} from 'react';
import {browser} from 'webextension-polyfill-ts';

export default function Home(){
  useEffect(()=>{
    console.log("Sending message to backend");
    browser.runtime.sendMessage(`Henlow`);
  })

  return <div>Hey, I am home</div>
}