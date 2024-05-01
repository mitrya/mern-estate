import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytes, uploadBytesResumable} from 'firebase/storage'
import {  updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice.js'

import {app} from '../firebase.js'


const Profile = () => {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state) => state.user)
  const [file,setFile] = useState(undefined)
  const [filePerc,setFilePerc] = useState(0)
  const [fileUploadError,setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData,setFormData] = useState({});
  const dispatch = useDispatch();
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])
  

  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred/
      snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress))
      console.log('upload is' + progress + '% done');
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadUrl) => { setFormData({...formData,avatar:downloadUrl}) });
    }

    );

  };

  const handleChange = async (e) =>{
    setFormData({...formData,[e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        header:{
          'Content-Type':'application/json',
        },
        body : JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false)
      {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }
  console.log(currentUser)
  console.log(formData)

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <div className='text-3xl font-semibold text-center my-7'>Profile</div>
        
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

          <input onChange={(e)=> setFile(e.target.files[0])} 
          type="file" ref={fileRef} hidden accepts='image/*' />
      
           
          <img 
            onClick={() => fileRef.current.click()}
            
            src={ formData.avatar || currentUser.avatar}
            alt="profile"
         
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />

          <p className='text-sm self-center'>
            {
                (fileUploadError)
                
                ?
                    <span className='text-red-700'>Error Image Upload(Image must be less than 2 mb)</span>
                
                :
                    filePerc > 0 && filePerc < 100 
                    
                    ?
                    
                    
                        <span className='text-slate-700'>
                          {`Uploading ${filePerc}%`}
                        </span>
                      
                    :
                      filePerc === 100 
                      
                      ? 
                        <span className='text-green-700'>Image Successfully uploaded!</span> 
                      :
                        ""
            }
          </p>
            <input 
            type="text" 
            placeholder="username" 
            id="username" 
            defaultValue = {currentUser.username}
            onChange={handleChange}
            className='border 
            p-3 
            rounded-lg'/>

            <input 
            type="email" 
            placeholder="email" 
            id="email" 
            defaultValue = {currentUser.email}
            onChange={handleChange}
            className='border 
            p-3 
            rounded-lg'/>

            <input 
            type="text" 
            placeholder="password" 
            id="password" 
            onChange={handleChange}
            className='border 
            p-3 
            rounded-lg'/>


            <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update </button>
            

        </form>

        <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Sign Out</span>

        </div>
    </div>
  )
}

export default Profile