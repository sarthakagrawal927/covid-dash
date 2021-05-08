import React from "react";
import Link from "next/link";

const toggleStyles = (event) => {
  document.querySelector("#burger").classList.toggle("is-active");
  document.querySelector("#navbarmenu").classList.toggle("is-active");
};

const Navbar: React.FC = () => {
  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item'>
          <img src='/images/vercel.svg' />
        </a>
        <a
          id='burger'
          onClick={toggleStyles}
          role='button'
          className='navbar-burger burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarmenu'>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>
      <div id='navbarmenu' className='navbar-menu'>
        <div className='navbar-start'>
          <Link href='/'>
            <a className='navbar-item'>Home</a>
          </Link>
          <Link href='/secondPage'>
            <a className='navbar-item'>Second page</a>
          </Link>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <a
                onClick={() => alert("You clicked the button!")}
                className='button is-primary'>
                Click
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
