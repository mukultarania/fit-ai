'use client';

import { Dumbbell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  setCurrentPage: (page: 'home' | 'create-plan' | 'about' | 'research' | 'splits' | 'diet') => void;
}

export function Navbar({ setCurrentPage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (
    page: 'home' | 'create-plan' | 'about' | 'research' | 'splits' | 'diet'
  ) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <button
          onClick={() => handleNavigation('home')}
          className="flex items-center space-x-2"
        >
          <Dumbbell className="h-6 w-6" />
          <span className="font-bold text-xl">FitAI</span>
        </button>

        {/* Desktop Navigation */}
        <div className="ml-auto hidden md:flex items-center space-x-4">
          <Button variant="ghost" onClick={() => handleNavigation('home')}>
            Home
          </Button>
          <Button variant="ghost" onClick={() => handleNavigation('splits')}>
            Training Splits
          </Button>
          <Button variant="ghost" onClick={() => handleNavigation('diet')}>
            Diet Plan
          </Button>
          <Button variant="ghost" onClick={() => handleNavigation('about')}>
            About
          </Button>
          <Button variant="ghost" onClick={() => handleNavigation('research')}>
            Research
          </Button>
          <Button
            onClick={() => handleNavigation('create-plan')}
            className="bg-primary hover:bg-primary/90"
          >
            Create Plan
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="ml-auto md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden',
          'transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
          'overflow-hidden'
        )}
      >
        <div className="px-4 py-2 space-y-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('home')}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('splits')}
          >
            Training Splits
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('diet')}
          >
            Diet Plan
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('about')}
          >
            About
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation('research')}
          >
            Research
          </Button>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => handleNavigation('create-plan')}
          >
            Create Plan
          </Button>
        </div>
      </div>
    </nav>
  );
}