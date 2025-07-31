import Image from "next/image";
import Link from "next/link";

export default function NavLink({img, imgAlt, name, page}:{img:string, imgAlt:string, name:string, page:string}) {

    return (
        <Link href={page} className=" flex flex-col items-center justify-center w-1/5">
            <Image
                src={img}
                alt={imgAlt}
                width={30}
                height={30}/>
            <span className="text-xs mt-1 text-white">{name}</span>
        </Link>
    )
}