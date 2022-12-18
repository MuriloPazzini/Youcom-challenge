import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react'
import { Product } from '../interfaces/product'
import Layout from '../components/Layout'

const IndexPage = ({ products }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/favorites', {
      method: 'GET',
      credentials: 'include'
    })
      .then(results => results.json())
      .then(favorites => {
        products.forEach(product => {
          product.favorite = favorites.includes(product.id.toString());
        });
        setProductList(products);
      });
  }, []);

  //RF06
  const toggleFavorite = async (id) => {
    const res = await fetch(`http://localhost:8000/toggleFavorite/${id}`, {
      method: 'POST',
      credentials: 'include',
    });
    const favorites: string[] = await res.json();

    productList.forEach(product => {
      product.favorite = favorites.includes(product.id.toString());
    });

    setProductList([...productList]);
  }

  return (
    <Layout title="Youcom challenge | Murilo Pazzini">
      <div className='row products-container'>
        {productList.map((product) => (
          <div className='col-12 col-md-3'>
            <div key={product.id} className="product-card card">
              <a className="icon-container" onClick={() => toggleFavorite(product.id)}>
                <i className={product.favorite ? "bi bi-heart-fill" : "bi bi-heart"}></i>
              </a>
              <div className='discount-container'>
                <strong className='discount-amount'>{product.discountPercentage}% off</strong>
              </div>
              <div className='image-container'>
              <img src={product.thumbnail} className="card-image card-img-top" alt={product.title} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <div className="price-container">
                  <del className='original-price'>
                    <span>R$ {product.price} </span>
                  </del>
                  <strong><span> R$ {(product.price * -(product.discountPercentage-100) / 100).toFixed(2)}</span></strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:8000/products`, {
    method: 'GET',
    credentials: 'include',
  })
  const products: Product[] = await res.json()

  return {
    props: {
      products,
    },
    //RNF02
    revalidate: 30
  }
}

export default IndexPage