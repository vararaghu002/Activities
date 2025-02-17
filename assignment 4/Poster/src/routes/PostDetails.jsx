import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../Components/Modal.jsx';
import classes from './PostDetails.module.css';

function PostDetails() {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;

export async function loader({ params }) {
  try {
    const response = await fetch('http://localhost:8080/posts/' + params.id);

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
    }

    const resData = await response.json();
    return resData.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Response('Post not found', { status: 404 });
  }
}