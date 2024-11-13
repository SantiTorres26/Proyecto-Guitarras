import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {

    const initialState = () => {  //Local Storage y useEffect para recuperar los datos del carrito cuand actualizamos la pagina
        const localStorageCart = localStorage.getItem('cart');
        try {
            const cartData = localStorageCart ? JSON.parse(localStorageCart) : [];
            // Asegurarse de que el carrito no contenga elementos nulos o inválidos
            return cartData.filter(item => item != null && item.quantity != null && item.price != null);
        } catch (error) {
            console.error('Error al recuperar el carrito desde localStorage:', error);
            return [];  // En caso de error, retornar carrito vacío
        }
    };

    const [data, setData] = useState(db);  // STATE DE "BASE DE DATOS" 
    const [cart, setCart] = useState(initialState);  // STATE DE CARRITO

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));  //CARRITO persistente con el hook useEffect
    }, [cart]);

    function addToCart(item) {   //FUNCION P AGG AL CARRITO

        const itemExists = cart.findIndex((guitar) => guitar.id === item.id); //SI EL ELEMENTO EXISTE ACTUALIZAMOS CANTIDAD, Y SI NO EXISTE LO AGG AL STATE

        if (itemExists >= 0) {  //existe en el carrito
            if (cart[itemExists].quantity >= MAX_ITEMS) return  //para q boton "Añadir al carrrito" no pueda pasar mas de 5
            const updatedCart = [...cart];   //copia del carrito - el STATE es inmutable
            updatedCart[itemExists].quantity++;  //incrementador de cantidad de item
            setCart(updatedCart);
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));  // ELIMINAR ITEMS DEL CARRITO
    }

    function increaseQuantity(id) {  //FUNCION AUMENTAR CANTIDAD (+)
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart);
    }

    function decreaseQuantity(id) {  //FUNCION DISMINUIR CANTIDAD(-)
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart);
    }

    function clearCart() {  //FUNCION VACIAR CARRITO
        setCart([]);
    }

    return (
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (  // .map para ITERAR SOBRE LOS 12 ELEMENTOS DE LA BASE DE DATOS.
                        <Guitar
                            key={guitar.id}  // KEY prop identificador para iterar sobre listas.
                            guitar={guitar}  //  => PROPS !!! (mismo nombre que funcion)
                            setCart={setCart}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">    
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarStore - Todos los derechos Reservados</p>
                </div>
            </footer>

        </>
    )
}

export default App;
