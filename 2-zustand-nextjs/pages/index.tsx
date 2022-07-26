import type { NextPage } from 'next'
import { useCart } from '../store/store'
import { Product } from '../model/models'
import Header from '../components/header'
import { products } from '../lib/products'

const Home: NextPage = () => {
  const addToCart = useCart((state) => state.addToCart)
  const updateCart = useCart((state) => state.updateCart)
  const myCart = useCart((state) => state.cartContent)
  const addProduct = (params: Product) => {
    const product = myCart.findIndex((item) => item.id === params.id)
    if (product !== -1) {
      myCart[product].quantity = (myCart[product].quantity ?? 0) + 1
      updateCart({params, myCart})
    } else {
      addToCart(params)
    }
  }
  
  return (
    <>
      <Header />
      <div className="container mx-auto pt-4">
        <div className="pb-4">PRODUCTS</div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a
              key={product.id}
              href="#"
              onClick={() =>
                addProduct({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                })
              }
              className="group"
            >
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${product.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
