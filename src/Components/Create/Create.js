import React, { Fragment, useContext, useState} from 'react';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext'

const Create = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const storage = getStorage(firebase)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [Progressercent, setProgressercent] = useState(0)
  const date = new Date()

  const handleSubmit = (e) => {
    e.preventDefault()
    const storageRef = ref(storage, `/image/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on('state changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgressercent(progress)
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL) => {
          setImage(DownloadURL)
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            DownloadURL,
            userId:user.uid,
            createdAt: date.toDateString()
          })
        })
      }
    )


  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname"></label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              name="Name"
              placeholder="Name"
            />
            <br />
            <label htmlFor="fname"></label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e) => { setCategory(e.target.value) }}
              name="category"
              placeholder="Category"
            />
            <br />
            <label htmlFor="fname"></label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              value={price}
              onChange={(e) => { setPrice(e.target.value) }}
              name="Price"
              placeholder='Price' />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <form>
            <br />
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0])
              }}

            />
            <br />
            <button onClick={handleSubmit} className="uploadBtn" type='submit'>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
