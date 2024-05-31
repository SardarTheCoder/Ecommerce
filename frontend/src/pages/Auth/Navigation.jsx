import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUserAdd, AiOutlineLogin } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import "./Navigation.css";
import { logout } from '../redux/Features/auth/authSlice';

const Navigation = () => {
  //Define a selector function to extract userInfo from the Redux store state
  const userInfoSelector = state => state.userInfo;
  const userInfo = useSelector(userInfoSelector);
    

  //comment because it alternate use above 
    //  const{userInfo}= useSelector(state => state.auth);

  const [dropDownOpen , setDropDownOpen] = useState(false);
  const [showSideBar , setSideBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

////uselogin mutation solve
//  const { logoutApiCall } = useLoginMutation()
  
  
   const toggleDropDown = () => {

    setDropDownOpen(!dropDownOpen);
  };

  const toggleSideBar= () => {
    setSideBar(!showSideBar);
  };

  const closeSideBar = () => {
    setSideBar(false);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      // Call the logout API or dispatch an action to handle logout
      dispatch(logout()); // Assuming you have a logout action
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
      

      <>
      <div
        style={{ zIndex: 999 }}
        className={`${
          showSideBar ? 'hidden' : "flex"
        } xl:flex lg:flex container md:hidden sm:hidden flex-col justify-between
         p-4 text-white bg-black 
         w-[80px] hover:w-[140px] h-[100vh] transition-all fixed`}
        
      >
        <div className="flex flex-col gap-10 justify-center mt-[3rem] ">
         
         
          <Link to="/" className="flex  items-center transition-transform transform hover:translate-x-2 relative" >
            <AiOutlineHome className="mr-2" size={26} />
            <span className="absolute mx-8 hidden text-white nav-item-name font-bold font-serif group-hover:block">
              Home
            </span>{" "}
          </Link>


          <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2 relative" >
            <AiOutlineShopping className="mr-2" size={26} />
            <span className="absolute hidden mx-8 text-white nav-item-name font-bold font-serif group-hover:block">
              Shopping
            </span>{" "}
          </Link>
        
          <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2 relative">
            <AiOutlineShoppingCart className="mr-2" size={26} />
            <span className="absolute mx-8   hidden text-white nav-item-name font-bold font-serif group-hover:block">
              Cart
            </span>{" "}
          </Link>

          <Link to="/favourite" className="flex items-center transition-transform transform hover:translate-x-2 relative">
            <FaHeart className="mr-2" size={26} />
            <span className="absolute mx-8   hidden text-white nav-item-name font-bold font-serif group-hover:block">
              Favourite
            </span>{" "}
          </Link>
      
     </div>
    <div className="relative">
      <button onClick = { toggleDropDown } className="flex items-center
       text-gray-800 focus:outline-none">
        {userInfo ? <span className='text-white'> {userInfo.username} </span>
        :
        (<> </>)}
        </button>
    </div>

    


  <ul>
      
      <li>
        <Link to="/register" className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26}/>
        <span className='hidden nav-item-name mt-[3rem]'>Register </span>{" "}
        </Link>
      </li>

      <li>
        <Link to="/login" className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineLogin className='mr-2 mt-[2rem]' size={26}/>
        <span className='hidden nav-item-name mt-[2rem]'>Login </span>{" "}
        </Link>
      </li>
    </ul>
  </div>
  
  
  
  
  
  </>
  
      )}
export default Navigation;
