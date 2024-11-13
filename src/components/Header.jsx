import { useMemo } from 'react';

function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) {

    const isEmpty = useMemo(() => cart.length === 0, [cart]);  //STATE derivado, mantiene la logica fuera del template.

    // Aseguramos que 'cart' solo contenga productos válidos con 'quantity' y 'price' definidos
    const cartTotal = useMemo(() => {
        console.log(cart);  // Depuración: ver el contenido del carrito
        return cart.reduce((total, item) => {
            if (item && item.quantity != null && item.price != null) {  // Validación para evitar errores si 'item' es nulo o no tiene 'quantity' o 'price'
                return total + (item.quantity * item.price);  // Incrementamos el total
            }
            return total;  // Si 'item' no es válido, lo ignoramos y no lo sumamos
        }, 0);  // Inicializamos el total en 0
    }, [cart]);  // Dependencia de 'cart' para recalcular el total cuando cambia

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (           //si el carrito esta vacío o no...
                                    <p className="text-center">El carrito esta vacio</p>

                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(guitar => (     //ITERAR SOBRE LA TABLA 
                                                    <tr key={guitar.id} /* key prop*/>
                                                        <td>
                                                            <img
                                                                className="img-fluid"
                                                                src={`/img/${guitar.image}.jpg`}
                                                                alt="imagen guitarra"
                                                            />
                                                        </td>
                                                        <td>{guitar.name}</td>
                                                        <td className="fw-bold">
                                                            ${guitar.price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(guitar.id)}
                                                            >
                                                                -
                                                            </button>
                                                            {guitar.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(guitar.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(guitar.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                        <button 
                                        className="btn btn-dark w-100 mt-3 p-2"
                                        onClick={clearCart}
                                        >Vaciar Carrito</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;
        