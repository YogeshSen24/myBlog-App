import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { useNavigate, useParams , Link } from 'react-router-dom'
import service from '../appwrite/configur'
import { Container, Button } from '../components'


function Post() {
    const [post , setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state)=> state.userData)
    const isAuthor = post&& userData ? post.userId===userData.$id : false
    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post) setPost(post)
                else navigate("/")
            })
        }else navigate("/")
        // console.log(post)/
    } , [slug , navigate])
    

    const deletePost = ()=>{
        service.deletePost(post.$id).then((status)=>{
            if(status){
                service.deleteFile(post.image)
                navigate("/")
            }
        })
    }
  return post ? (
    <div className="py-8 rounded-xl p-2 m-2">
            <Container>
                <div className="w-full flex justify-center mb-4 relative ">
                    <img
                        src={service.getFilePreview(post.image)}
                        alt={post.title}
                        className="object-contain h-50 "
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded ">
                                    Edit
                                </Button>
                            </Link>
                            <Button className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 m-2 rounded " onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl text-blue-500 font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
  ) : null
}

export default Post
