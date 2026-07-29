import { motion } from 'framer-motion'
import { CircleUserRound, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

import manyfacesLogo from '@/assets/img/manyfacesLogo.svg'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { primaryNavItems } from '@/data/navigation'

export function Navbar({ cartCount, onCartOpen }) {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-7 py-4 md:px-20 lg:px-28"
    >
      <Link to="/" aria-label="manyfaces home" className="shrink-0">
        <img src={manyfacesLogo} alt="manyfaces Logo" className="w-[150px]" />
      </Link>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {primaryNavItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild>
                <Link to={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-3">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="hidden text-black hover:bg-black/10 md:inline-flex"
          aria-label="Account"
        >
          <Link to="/#account">
            <CircleUserRound className="size-6" />
          </Link>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative size-11 text-black hover:bg-black/10"
          aria-label="Open cart"
          onClick={onCartOpen}
        >
          <ShoppingBag className="size-6" />
          <span className="absolute -right-1 top-0 grid size-5 place-items-center rounded-full bg-black font-sans text-[11px] font-bold text-white">
            {cartCount}
          </span>
        </Button>
      </div>
    </motion.header>
  )
}
