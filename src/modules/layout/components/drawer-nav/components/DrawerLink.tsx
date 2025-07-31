import Image from "next/image";
import Link from "next/link";

export default function DrawerLink({ img, imgAlt, name, page}: {img:string, imgAlt:string, name:string, page:string}) {

    return (
        <Link href={page} className="hidden md:flex p-3 rounded-lg hover:bg-[#8F9C68]">
            <Image
                src={img}
                className="mr-2 flex-shrink-0"
                alt={imgAlt}
                width={15}
                height={15}/>{name}
        </Link>
    )
}