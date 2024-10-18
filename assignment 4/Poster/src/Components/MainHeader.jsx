
import {MdPostAdd, MdMessage} from 'react-icons/md'
import classes from './MainHeader.module.css';
import {Link} from 'react-router-dom';

function MainHeader(){
   return (
    <header className={classes.header}>
        <h1 className={classes.logo}>
            <MdMessage />
            Poster
        </h1>
        <p>
             <Link to="/create-post" className={classes.button} >
                <MdPostAdd />
                New Post
             </Link>
        </p>
    </header>
   );
}

export default MainHeader;