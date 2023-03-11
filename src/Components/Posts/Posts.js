import React, { useEffect, useContext, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';

import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';
import './Post.css';

function Posts() {

  const { firebase } = useContext(FirebaseContext)
  const {setPostDetails} = useContext(PostContext)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allPost)

    })
  },[])

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {
            products.slice(0,5).map(product=>{
              return <div className="card">
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.DownloadURL} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
            })
            }
        </div>
      </div>
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map(product => {
              return <div onClick={()=>{
                
                setPostDetails(product)
                navigate('/view-post')
                
              }}
              className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.DownloadURL} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            })
          }
        </div>
      </div>
      
    </div>
  );
}

export default Posts;
