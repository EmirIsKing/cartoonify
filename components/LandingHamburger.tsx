import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button'
import Link from 'next/link'
import { Menu } from 'lucide-react'


const LandingHamburger = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 max-md:flex hidden">
            <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col backdrop-blur-lg top-[20px] px-8 pt-20">
                <SheetHeader>
                <SheetTitle></SheetTitle>
                </SheetHeader>
                <Link href={'#'} className='hover:opacity-70'>Features</Link>
                <Link href='#how-it-works' className='hover:opacity-70'>How it Works</Link>
                <Link href='/sign-in' className='hover:opacity-70'>Sign In</Link>
                <Link href={'/sign-up'} className='hover:cursor-pointer'>
                <Button className='p-5 rounded-full bg-button hover:cursor-pointer hover:opacity-80 active:scale-[0.97] transition-transform duration-100'>Get Started</Button>
                </Link>
      </SheetContent>
    </Sheet>
  )
}

export default LandingHamburger
