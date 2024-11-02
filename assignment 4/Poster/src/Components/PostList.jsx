import {useEffect, useState} from 'react'
import { useLoaderData } from 'react-router-dom';
import Post from "./Post.jsx";

import classes from './PostList.module.css'

function PostList() {
      const posts=useLoaderData();//return post data from loader function in posts.jsx
    
    return( 
        <>
    {
    posts.length>0 && 
    (
    <ul className={classes.posts}>
         {posts.map((post)=><Post key={post.id} id={post.id} author={post.author} body={post.body}/>)}
    </ul>
    )
    }

     {posts.length==0&&(<div style={{textAlign:'center',color:'white'}}>
      <h2>There are no Posts yet</h2>
      <p>Start adding some!</p>
      </div>)}
     
    </>
    );
}


export default PostList;