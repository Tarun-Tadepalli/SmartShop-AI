import {useEffect, useState} from "react";
  
import {useNavigate} from "react-router-dom";
  
import CustomerLayout from "../components/CustomerLayout";
  
import CustomerProductCard from "../components/CustomerProductCard";
  
import {getProducts} from "../services/productApi";
  
function CustomerProduct() {
  
    const navigate =useNavigate();
  
    const [products, setProducts] = useState([]);
  
    useEffect(() => { loadProducts();}, []);
  
    const loadProducts =async () => {
      try {
  
        const response = await getProducts();
  
        const list = response.data.map(
          (product) => ({
            id: product[0],
  
            name: product[1],
  
            description: product[2],
  
            price: product[3],
  
            stock: product[4],
  
            category: product[5],
  
            image_url: product[6]
          })
        );
  
        setProducts(list);
  
      }
  
      catch(error) {
  
        console.log(error);
  
      }
    };
  
    const addToCart = (product) => {
      let cart = JSON.parse( localStorage.getItem("cart")) 
      || [];
  
      cart.push(product);
  
      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
  
      alert(
        "Added To Cart"
      );
    };
  
    const buyNow = (product) => {

      const item = {
        ...product,
        quantity: 1
      };
    
      localStorage.setItem(
        "checkoutItems",
        JSON.stringify([item])
      );
    
      navigate("/checkout");
    };
  
    return (
  
      <CustomerLayout>
  
        <h1>
          Products
        </h1>
  
        <div className="products-grid">
  
          {
            products.map(
              (product) => (
  
                <CustomerProductCard
  
                  key={product.id}
  
                  product={product}
  
                  onAddToCart={addToCart}
  
                  onBuyNow={buyNow}
  
                />
  
              )
            )
          }
  
        </div>
  
      </CustomerLayout>
    );
  }
  
  export default CustomerProduct;