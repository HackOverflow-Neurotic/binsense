'use client';
import { useIPStore } from "~/app/store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export default function Navbar() {
    const role = useIPStore((state) => state.role);
    const setRole = useIPStore((state) => state.setRole);
    const router = useRouter();
    return (
        <div className="w-full top-0 z-50 fixed">
            <div className="flex bg-white bg-opacity-20 backdrop-blur-lg justify-between items-center px-10 py-6 border-white border-1.5 ">
            <div className="text-3xl font-bold">
                    <span className="text-purple-500">Bin</span>Sense
                </div> 
                {
                    role && (
                        <Button onClick={() => {
                            setRole('');
                            router.push('/');
                        }}>
                            Disconnect
                        </Button>
                    )
                }
            </div>
        </div>
    );
}
