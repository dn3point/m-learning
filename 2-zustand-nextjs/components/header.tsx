import { useCart } from '../store/store'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const total = useCart((state) => state.total)
  const totalQty = useCart((state) => state.totalQty)
  
  const clearCart = useCart((state) => state.cartContent)
  const [myTotal, setTotal] = useState<number>()
  const [myTotalQty, setTotalQty] = useState<number>()
  
  useEffect(() => {
    setTotal(total)
    setTotalQty(totalQty)
  }, [total])
  
  return (
    <div className="w-full bg-slate-200 py-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link href="/">
            <a className="font-extrabold">MY-COOL-SHOP</a>
          </Link>
        </div>
        <div className="font-light uppercase">
          <Link href="/about">
            <a>About</a>
          </Link>
          &nbsp; |&nbsp;
          <Link href="/cart">
            <a>Cart</a>
          </Link>
          : ${myTotal} / {myTotalQty}
        </div>
      </div>
    </div>
  )
}

export default Header