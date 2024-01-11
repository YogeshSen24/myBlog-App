import React ,{useEffect , useState} from 'react'
import service from '../appwrite/configur'
import { Container, PostCard } from '../components'
function AllPosts() {
    const [posts , setPosts] = useState([])
    useEffect(()=>{
      service.getPosts().then((posts)=>{
          if(posts){
              setPosts(posts.documents)
              // console.log(posts.documents);
          }
      })
    } , [])
  return (
    <div className='w-full py-8'>
      <h1>All Post</h1>
      <Container>
        <div className='flex flex-wrap'>
        {
            posts.map((post) => (
              <div className='p-2 w-1/4' key={post.$id} >
                <PostCard  post = {{...post}}/>
              </div>
            ))
        }
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
