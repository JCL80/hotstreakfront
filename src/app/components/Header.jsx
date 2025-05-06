'use client';

import Logo from './molecules/Logo';
import SearchBar from "./molecules/SearchBar"
import AuthButtons from './molecules/AuthButtons';
import MenuToggle from './molecules/MenuToggle';
import SidebarSheet from "./SidebarSheet"

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border/40 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center gap-4 h-16 px-4 sm:px-6">
        <Logo />

        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <AuthButtons />
          {/* <MenuToggle  /> */}
          <SidebarSheet />
        </div>
      </div>
    </header>
  );
}
