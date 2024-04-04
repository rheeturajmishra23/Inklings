import { useParams,useNavigate } from 'react-router-dom';
import React,{ useState,useEffect } from 'react';
import appwriteDbService from '../appwrite/dbConfig';
import {Container, PostForm} from "../components/index"

function EditPost() {

    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        if(slug){
            appwriteDbService.getPost(slug)
               .then((post)=>{
                    if(post){
                        setPost(post)
                    }
                })
        } else {
            navigate('/')
        }
    },[slug,navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>          
        </Container>
    </div>
  ) :null
}

export default EditPost
