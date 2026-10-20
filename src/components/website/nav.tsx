import Link from 'next/link';
import { AuthButton } from '@/features/auth/components/auth-button';
import { ModeToggle } from '@/components/ui';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Skill<span className="text-blue-600">NearMe</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <Link href="/#explore" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Explore Teachers
          </Link>
          <Link href="/#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            How It Works
          </Link>
          <Link href="/#categories" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Categories
          </Link>
        </nav>

        {/* Right Auth Action */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
