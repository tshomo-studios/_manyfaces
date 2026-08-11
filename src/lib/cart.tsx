import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  handle: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, "qty">, qty: number) => void;
  remove: (handle: string) => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartState | null>(null);
const KEY = "manyfaces-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((line: Omit<CartLine, "qty">, qty: number) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.handle === line.handle);
      if (existing) {
        return prev.map((l) => (l.handle === line.handle ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { ...line, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((handle: string) => {
    setLines((prev) => prev.filter((l) => l.handle !== handle));
  }, []);

  const value = useMemo<CartState>(
    () => ({
      lines,
      open,
      setOpen,
      add,
      remove,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
    }),
    [lines, open, add, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const RAND = (n: number) => `R ${n.toLocaleString("en-ZA")}`;
