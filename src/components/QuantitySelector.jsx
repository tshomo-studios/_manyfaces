import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function QuantitySelector({ value, onChange }) {
  return (
    <div className="flex h-10 items-center rounded-full border border-black px-3 text-xl font-semibold">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 hover:bg-black/10"
        aria-label="Decrease quantity"
        disabled={value === 1}
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus className="size-4" />
      </Button>
      <span className="min-w-8 text-center">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 hover:bg-black/10"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  )
}
