import React from 'react'
import { useState,useEffect } from 'react'
import M from 'materialize-css'
import { useNavigate } from 'react-router-dom'
export const CreatePost = () => {
  const navigate = useNavigate()
  const [title,setTitle] = useState("")
  const [body,setBody]   = useState("")
  const [place,setPlace]  = useState("")
  const [image,setImage] = useState('')
  const [url,setUrl] = useState("")
  useEffect(() => {
    if (url) {
      fetch("https://instaclone-nodejs-server.onrender.com/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          img: url,
          place,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: "Posted Successfully",
              classes: "#43a047 green darken-1",
            });
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url, title, body, place, navigate]);
  const postDetails = () =>{
    
      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","insta-clone")
      data.append("cloud_name","dictwwilb")
        fetch("https://api.cloudinary.com/v1_1/dictwwilb/image/upload",{
        method:"post",
        body: data
      })
      .then(res=>res.json())
      .then(data=>{
          setUrl(data.url)
      })
        .catch(err=>{
            console.log(err)
    })
  
       
  
  }
  return (
    <div className='card input-filed'
    style={{margin:"60px auto",
    maxWidth:"500px",
    padding:"20px",
    textAlign:"center",}} >
        <div className='file-field input-field' >
            <div className='btn #64b5f6 blue darken-1'>
                <span>Browse</span>
                <input type="file"
                onChange={(e)=>setImage(e.target.files[0])}
                />
            </div>
            <div className='file-path-wrapper'>
                <input className='file-path validate' type='text'/>
            </div>
        </div>
        <input type = 'text' placeholder='Author'
        value={title}
        onChange = {(e)=>setTitle(e.target.value)}
        />
        <input type = 'text' placeholder='Place'
        value={place}
        onChange = {(e)=>setPlace(e.target.value)}
        />
        <input type = 'text' placeholder='Description'
        value={body}
        onChange = {(e)=>setBody(e.target.value)}
        />
        <button className='btn waves-effect waves-light #64b5f6 blue darken-1'
        onClick={()=>postDetails()}
        >
          Post
        </button>
    </div>
  )
}
