
import {Outlet} from 'react-router-dom';
import PostList from '../Components/PostList.jsx';


function Posts() {

return (
    <>
    <Outlet />
    <main>
      <PostList  />
    </main>
    
    </>
  );
}

export default Posts;

export async function loader() {
  try {
    const response = await fetch('http://localhost:8080/posts');

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }

    const resData = await response.json();
    return resData.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Response('Posts not found', { status: 404 });
  }
}