import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400", 
        "500", 
        "600", 
        "700"
    ],
});

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 
             md:flex">
                <Image 
                src="/logo.png" 
                alt="logo"
                height={40}
                width={40}
                />
                <p className={cn("text-lg text-neutral-700 pb-1 hidden md:block",
                poppins.className,)}>PostUp</p>
            </div>

        </Link>
    )
}