import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextTypes {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextTypes | undefined>(
    undefined
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};


export const useSidebar = (): SidebarContextTypes => {
    const context = useContext(SidebarContext);
    if(!context){
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}