import { Sparkles, BookOpen, Info } from 'lucide-react';
import { NavBar } from "./tubelight-navbar";

export function NavBarDemo() {
  const navItems = [
    { name: 'Features', url: '#features', icon: Sparkles },
    { name: 'How it works', url: '#how-it-works', icon: BookOpen },
    { name: 'About', url: '/about', icon: Info }
  ];
  return <NavBar items={navItems} className="liquid-radiant-navbar" />;
}
