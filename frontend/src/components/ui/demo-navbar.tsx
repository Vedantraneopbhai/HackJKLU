import { Home, User, Briefcase, FileText, Settings } from 'lucide-react'
import { NavBar } from "./tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Projects', url: '#', icon: Briefcase },
    { name: 'Resume', url: '#', icon: FileText },
    { name: 'Settings', url: '/settings', icon: Settings }
  ]

  return <NavBar items={navItems} />
}
