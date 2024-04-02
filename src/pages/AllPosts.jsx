import React,{useState, useEffect} from 'react'
import appwriteDbService from '../appwrite/dbConfig';
import {Container, PostCard} from '../components'
function AllPosts() {

    const [posts,setPosts] = useState([]);
    useEffect(()=>{},[])
    appwriteDbService.getPosts()
       .then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
       })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div className='p-2 w-1/4' key={post.$id}>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>            
        </Container>
      
    </div>
  )
}

export default AllPosts
