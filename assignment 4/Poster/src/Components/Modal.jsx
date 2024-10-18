import { useNavigate } from 'react-router-dom';
import  classes from './Modal.module.css';

function Modal({children}){ //children-> NewPost
   const navigate = useNavigate();
   function closeHandler(){
       navigate('..');
   }
   return <>
      <div className={classes.backdrop} onClick={closeHandler}/>  {/*background or backdrop*/}
     <dialog open className={classes.modal}>{children}</dialog>   
   </>
}
export default Modal;