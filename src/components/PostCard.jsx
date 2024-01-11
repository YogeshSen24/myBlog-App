import React from 'react'
import service from '../appwrite/configur'
import { Link } from 'react-router-dom'


function PostCard({post}) {
  // console.log(post);
  return (
    <Link className='' to={`/post/${post.$id}`}>
        <div className='w-full bg-blue-500 rounded-xl p-4 hover:bg-blue-600'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(post.image)} alt={post.title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold text-white'
            >{post.title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
