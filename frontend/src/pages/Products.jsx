import { useEffect, useState } from "react";

import MainLayout from "../components/Mainlayout";

import ProductCard from "../components/ProductCard";

import ProductModal from "../components/ProductModal";

import { getProducts } from "../services/productApi";

import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  useEffect(() => {loadProducts();}, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();

      const productList = response.data.map(
        (product) => {
          return {
            id: product[0],

            name: product[1],
  
            description: product[2],

            price: product[3],

            stock: product[4],

            category: product[5],

            image_url: product[6],

           product_code: product[7]
          };
        }
      );
      setProducts(productList);
    }
    catch (error) {
      console.log(error);
    }
  };


  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(search.toLowerCase())
    ||
    product.product_code.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
  <MainLayout>

  <div className="products-header">

    <h1>
      Products
    </h1>

    <input
      type="text"
      placeholder="Search Product..."
      className="products-search"
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
    />

  </div>

  <div className="products-grid">

    {
      filteredProducts.map(
        (product) => (

          <ProductCard
            key={product.id}
            product={product}
            onView={setSelectedProduct}
          />

        )
      )
    }

  </div>

  <ProductModal
    product={selectedProduct}
    onClose={() =>
      setSelectedProduct(
        null
      )
    }
  />

</MainLayout>


);
}

export default Products;
