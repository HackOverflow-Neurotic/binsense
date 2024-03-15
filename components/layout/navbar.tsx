'use client';
import { useIPStore } from "~/app/store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Navbar() {
  const role = useIPStore((state) => state.role);
  const setRole = useIPStore((state) => state.setRole);
  const router = useRouter();
  return (
    <div className="w-full top-0 z-50 fixed">
      <div className="flex bg-white bg-opacity-50 backdrop-blur-lg justify-between items-center px-10 py-6 border-white/50 border-b-2 ">
        <div className="text-4xl font-black bg-gradient-to-b from-purple-600 to-black text-transparent bg-clip-text">
          <span className="text-4xl font-black text-black">Bin</span>
          <Link href={"/"}>Sense</Link>
        </div>
        {role && (
          <Button
            variant={"v2"}
            onClick={() => {
              setRole("");
              router.push("/");
            }}
          >
            Disconnect
          </Button>
        )}
      </div>
    </div>
  );
}
