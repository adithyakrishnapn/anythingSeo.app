import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Sidebar from "./Sidebar"
import { anythingSeo } from "../../constants/anythingSeo"
import CollapsedBtn from "../common/CollapsedBtn"

function Navbar({ collapsed, setCollapsed }) {
    return (
        <header className="flex items-center border-b px-4 py-3 md:hidden bg-background">
            {/* Mobile Menu */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64" showCloseButton={false}>
                    <SheetTitle className="sr-only">
                        {anythingSeo.companyName}
                    </SheetTitle>

                    <SheetDescription className="sr-only">
                        Dashboard Menu
                    </SheetDescription>
                    <Sidebar mobile={true} collapsed={false} setCollapsed={setCollapsed} />
                </SheetContent>
            </Sheet>
            {/* Brand */}
            <h1 className="text-lg font-bold text-primary tracking-tight ml-4">
                {anythingSeo.companyName}
            </h1>
        </header>
    )
}

export default Navbar