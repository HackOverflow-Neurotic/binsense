'use client';
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useEffect } from 'react';
import { useIPStore } from '../store';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment',
  };
  
export default function Camera(){
    const webcamRef = useRef(null);
    const [photoLocation, setPhotoLocation] = useState(null);
    const [result, setResult] = useState();
    const ipNumber = useIPStore((state) => state.ip);
    const portNumber = useIPStore((state) => state.port);
    const role = useIPStore((state) => state.role);
  const cameraOpen = useIPStore((state) => state.cameraOpen);
  const setCameraOpen = useIPStore((state) => state.setCameraOpen);
    async function sendImage(imageBlob: Blob) {
      const formData = new FormData();
      formData.append('file', imageBlob, 'image.jpg');
    
      const response = await fetch(`http://${ipNumber}:${portNumber}`, {
        method: 'POST',
        body: formData,
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const responseData = await response.json()
    }
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        if (webcamRef.current && cameraOpen ) {
          //@ts-ignore
          const imageSrc = webcamRef.current.getScreenshot();
          setPhotoLocation(imageSrc);
          fetch(imageSrc)
          .then(res => res.blob())
          .then(sendImage)
          .catch(console.error);
          // setPhotoLocation(imageSrc);
        }
      },1000/parseInt(process.env.FPS ?? '3'));
  
      return () => {
        clearInterval(intervalId);
      }
    })

    if(role !== 'camera'){
      return(
        <>
          <div>
            Looser
          </div>
        </>
      )
    }

    return (
        <>
        <div className="flex flex-col gap-5 justify-center items-center w-full ">
          {
            cameraOpen && (
              <div className="flex flex-col gap-5 justify-center items-center w-full">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            )
          }
          <div className='flex gap-5 justify-center items-center w-full'>
            <Badge>
              {role.toUpperCase()}
            </Badge>
            <Badge>
              {`${ipNumber}:${portNumber}`}
            </Badge>
          </div>

          <div className='flex gap-5 justify-center items-center w-full'>
            {
              cameraOpen ? (
                <Button onClick={setCameraOpen}>
                  Stop Camera
                </Button>
              ) : (
                <Button onClick={setCameraOpen}>
                  Start Camera
                </Button>
              )
            }
          </div>
        </div>
      </>
      );
    
  
}