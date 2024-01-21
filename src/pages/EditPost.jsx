import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/configur";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      console.log(slug);
      service.getPost(slug).then((posts) => {
        if (posts) {
          setPost(posts);
          
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return  post ? (
    <div className='py-8'>
    <Container>
        <PostForm post={post} />
    </Container>
</div>
  ) : <h1>loading...</h1>;
}

export default EditPost;
