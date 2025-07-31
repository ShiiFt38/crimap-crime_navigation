'use client'

import NavLink from "@/modules/layout/components/bottom-nav/components/NavLink";

export default function BottomNav(){

    const links = [
        {image: "/space_dashboard_24dp.svg", alt: "dashboard page", name: "Dashboard", page: "/"},
        {image: "/area_chart_24dp.svg", alt: "Areas", name: "My Areas", page: "/my-areas"},
        {image: "/lab_profile_24dp.svg", alt: "Reports page", name: "Reports", page: "/reports"},
        {image: "/emergency_home_24dp.svg", alt: "Emergency page", name: "Emergency", page: "/emergency"},
        {image: "/person_24dp.svg", alt: "Account settings", name: "Account", page: "/account"},
    ]

    return (
        <nav className="md:hidden z-10 flex fixed bottom-0 left-0 right-0 h-16 bg-[#1E4B26] shadow-lg justify-around items-center">
            {links.map((e, idx) => (
                <NavLink
                    key={idx}
                    img={e.image}
                    imgAlt={e.alt}
                    name={e.name}
                    page={e.page}/>
            ))}

        </nav>)
}