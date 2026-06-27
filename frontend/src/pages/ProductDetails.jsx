import {useEffect,useState} from "react";

import {useParams} from "react-router-dom";

import MainLayout from "../components/MainLayout";

import {getProductById} from "../services/productApi";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => { loadProduct();}, []);

  const loadProduct =
  async () => {

    try {

      const response = await getProductById( id );

      setProduct( response.data );
    }

    catch ( error ) {
      console.log( error);
    }
  };

  if (!product) {

    return (
      <MainLayout>

        <h2>
          Loading...
        </h2>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <div
        className="card"
      >

        <h1>
          {product[1]}
        </h1>

        <br />

        <p>
          Category:
          {product[5]}
        </p>

        <br />

        <p>
          Price:
          ₹ {product[3]}
        </p>

        <br />

        <p>
          Stock:
          {product[4]}
        </p>

        <br />

        <p>
          Description:
          {product[2]}
        </p>

      </div>

    </MainLayout>

  );
}

export default ProductDetails;