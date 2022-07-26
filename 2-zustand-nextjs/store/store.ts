import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../model/models'


interface UpdateCartParams {
  params: Product
  myCart: Product[]
}

interface CartState {
  total: number
  totalQty: number
  cartContent: Product[]
  addToCart: (params: Product) => void
  updateCart: ({params, myCart}: UpdateCartParams) => void
  clearCart: () => void
  removeFromCart: (params: Product) => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      total: 0,
      totalQty: 0,
      cartContent: [],
      addToCart: (params) => {
        set((state) => ({
          total: state.total + parseFloat(params.price),
          totalQty: state.totalQty + 1,
          cartContent: [...state.cartContent, params],
        }))
      },
      updateCart: ({params, myCart}) => {
        set((state) => ({
          totalQty: state.totalQty + 1,
          total: state.total + parseFloat(params.price),
          cartContent: myCart,
        }))
      },
      clearCart: () => set({
        total:0, totalQty: 0, cartContent: []
      }),
      removeFromCart: (params) => {
        set((state) => ({
          total: state.total - parseFloat(params.price) * params.quantity,
          totalQty: state.totalQty - params.quantity,
          cartContent: state.cartContent.filter(
            (item) => item.id !== params.id
          )
        }))
      },
    }),
    {name: 'cart'}
  )
)