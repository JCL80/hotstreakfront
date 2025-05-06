'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MenuToggle({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} size="icon" variant="ghost">
      <Menu className="w-6 h-6" />
    </Button>
  );
}
