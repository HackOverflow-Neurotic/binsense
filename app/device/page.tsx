'use client';
import { useIPStore } from "../store";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
export default function Device(){
    const ipNumber = useIPStore((state) => state.ip);
    const portNumber = useIPStore((state) => state.port);
    const [resArray, setResArray] = useState<string[]>([]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            async function fetchData(){
                const response = await fetch(`http://${ipNumber}:${portNumber}/feed`, {
                    method: "GET",
                });
                const data = await response.json();
                if (data.prediction) {
                    const responseType = data.prediction;
                    setResArray((prevArray) => {
                      const newArray = [...prevArray, responseType];
                      if (newArray.length > 10) {
                        newArray.shift();
                      }
                      return newArray;
                    });
                  } else {
                    throw new Error("Network response was not ok");
                  }
            }
            fetchData();
        }, 1000/(parseInt(process.env.FPS ?? "3")+0.5));
        return () => clearInterval(intervalId);
    
    })
    const role = useIPStore((state) => state.role);

    // if (role !== "device") {
    //     return (
    //       <>
    //         <div className='text-5xl font-semibold justify-center w-full items-center'>Page Not found</div>
    //       </>
    //     );
    //   }
    return(
        <>
        
        {resArray.length > 0 && (
          <div className="flex flex-col gap-2 justify-center items-center w-full mt-5">
          <div className=" text-6xl font-black bg-gradient-to-b from-purple-500 to-white text-transparent bg-clip-text">
            Response
          </div>
          <div className="flex justify-center  ">
            <div className="bg-opacity-20 backdrop-filter w-[32rem] flex mx-auto justify-center backdrop-blur-md bg-white rounded-lg border-1 border-white/50">
              <div className="flex justify-center items-center h-[40vh] overflow-y-auto">
                <div className="flex flex-col gap-5 md:max-w-min mx-5">
                  {/* <div className="w-full flex gap-5"></div> */}
                  <ul className="justify-center flex flex-col gap-2">
                    {" "}
                    {resArray.map((item, index) => (
                      <li key={index}>
                        {" "}
                        <Badge>{item.toUpperCase()}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
            </>
    )
}