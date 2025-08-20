'use client'
// Provides access to state variables and setter functions through a shared context environment
import { createContext, useState, useContext, ReactNode } from 'react'

type MenuContextType = {
    isFilterOpen: boolean
    toggleFilter: () => void

    isDrawerOpen: boolean
    toggleDrawer: () => void
}

const MenuContext = createContext<MenuContextType | null>(null)

export const useMenu = () => {
    const context = useContext(MenuContext)
    if (!context) throw new Error('useMenu must be used within MenuProvider')
    return context
}

export function MenuProvider({ children }: { children: ReactNode }) {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    const toggleFilter = () => setIsFilterOpen(prev => !prev)
    const toggleDrawer = () => setDrawerOpen(prev => !prev)

    return (
        <MenuContext.Provider value={{
            isFilterOpen: isFilterOpen,
            toggleFilter,
            isDrawerOpen: isDrawerOpen,
            toggleDrawer
        }}>
            {children}
        </MenuContext.Provider>
    )
}
