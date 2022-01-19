// pages/posts/[id].js 
import { API, Storage } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { listPosts, getPost } from '../../src/graphql/queries'
import {updatePost} from '../../src/graphql/mutations'
import Comments from '../../components/Comments'
import checkUser from '../../helpers/checkUser'

export default function Post({ post }) {
  const router = useRouter();
  const user = checkUser();
  const [coverImage, setCoverImage] = useState(null)
  if (router.isFallback) return <div>Loading...</div>
  useEffect(() => {
  
    updateCoverImage()
  }, [])
  async function updateCoverImage() {
    if (post.coverImage) {
      const imageKey = await Storage.get(post.coverImage)
      setCoverImage(imageKey)
    }
  }


  if (router.isFallback) {
    return <div>Loading...</div>
  }
  // console.log('post: ', post)
  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide">{post.title}</h1>
      {
        coverImage && <img src={coverImage} className="mt-4" />
      }
      <p className="text-sm font-light my-4">by {post.username}</p>
      <div className="mt-8">
        <ReactMarkdown>{post.content}</ReactMarkdown>  
      </div>
      
      { user && <Comments postId={post.id} /> }
    </div>
  )
}

export async function getStaticPaths() {
  const postData = await API.graphql({
    query: listPosts
  })
  const paths = postData.data.listPosts.items.map(post => ({ params: { id: post.id }}))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params
  const postData = await API.graphql({
    query: getPost, variables: { id }
  })
  console.log({ post: JSON.stringify(postData) });
  return {
    props: {
      post: postData.data.getPost
    }
  }
}