'use client'
import { Button } from "~/components/ui/button";
import { z } from "zod";
import ip from "ip";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { useIPStore } from "./store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const ipZ = z.string().refine(ip.isV4Format || ip.isV6Format, {
    message: 'Invalid IP address',
  });
    const portZ = z.string().refine((n) => parseInt(n) > 0 && parseInt(n) < 65536, {
    message: 'Invalid port number',
  });

  const ipNumber = useIPStore((state) => state.ip);
  const portNumber = useIPStore((state) => state.port);
  const role = useIPStore((state) => state.role);
  const setIpNumber = useIPStore((state) => state.setIP);
  const setPortNumber = useIPStore((state) => state.setPort);
  const setRole = useIPStore((state) => state.setRole);

  async function setValues(ipNumber: z.infer<typeof ipZ>,portNumber: z.infer<typeof portZ>, role: 'camera' | 'device') {
    if (ipZ.safeParse(ipNumber).success && portZ.safeParse(portNumber).success) {
      try{
        toast.loading('Connecting...',{id: 'connecting'})
        const response = await fetch(`http://${ipNumber}:${portNumber}/ping`, {
          method: 'GET',
        });
        console.log(response);
        if(response){
          setIpNumber(ipNumber);
          setPortNumber(portNumber);
          setRole(role);
          router.push('/camera');
          toast.success(`Connected as ${role}`)
          toast.dismiss('connecting');
        }
      }catch(e){
        toast.error(`There${"'"}s no server running on this IP and Port`);
        toast.dismiss('connecting');
      }
    }else{
      if(!ipZ.safeParse(ipNumber).success && portZ.safeParse(portNumber).success){
        toast.error('Enter valid IP address')
      }
      if(ipZ.safeParse(ipNumber).success && !portZ.safeParse(portNumber).success){
        toast.error('Enter valid Port number')
      }
      if(!ipZ.safeParse(ipNumber).success && !portZ.safeParse(portNumber).success){
        toast.error('Enter valid IP and Port')
      }
    }
  }

  return (
    <>
      <div className="flex w-full justify-center items-center h-[80dvh] overflow-y-auto">
        <div className="flex flex-col gap-5 md:max-w-min w-full mx-5">
        <div className="w-full flex gap-5">
          <Input placeholder="0.0.0.0" onChange={(e)=>{setIpNumber(e.target.value)}} value={ipNumber} className="w-2/3" />
          <Input placeholder="5000" onChange={(e)=>{setPortNumber(e.target.value)}} value={portNumber} className="w-1/3"/>
        </div>
        <div className="flex gap-5 md:flex-row flex-col">
        <Button size={'lg'} onClick={async () => {await setValues(ipNumber,portNumber,'camera')}}>
          Join as Camera
        </Button>
        <Button size={'lg'} onClick={async () => {await setValues(ipNumber,portNumber,'device')}}>
          Join as Device
        </Button>
        </div>
        </div>
      </div>
    </>
  );
}

