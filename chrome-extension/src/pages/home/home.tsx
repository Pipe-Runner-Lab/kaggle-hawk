import React, {useEffect} from 'react';
import {browser} from 'webextension-polyfill-ts';

export default function Home(){
  useEffect(()=>{
    browser.runtime.sendMessage(`Ola...`);
  })

  return <div>Hey, I am home</div>
}