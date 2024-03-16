'use client';
import React, { useRef, useState } from 'react';
import {Camera} from 'react-camera-pro-react-18';

const videoConstraints = {
  width: 1280,
  height: 720,
};

export default function Test() {
  const webcamRef = useRef(null);
  const [image,setImage]= useState(null);

  return (
    <>
      <Camera ref={webcamRef} errorMessages={{
              noCameraAccessible: undefined,
              permissionDenied: undefined,
              switchCamera: undefined,
              canvas: undefined
          }}/>
      
    </>
  );
}
