import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarLogo from "../assets/images/logo-black.png";
import { Cookies } from 'react-cookie';

const Navbar = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const logOut = () => {
        cookies.remove('lfr-access-key');
        navigate('/');
    }
    return (
        <nav className='xui-navbar xui-container xui-navbar-blurred' brand="true" layout="1" menu="2">
            <div className="brand">
                <Link className="xui-text-dc-none xui-text-inherit xui-d-inline-flex xui-flex-ai-center" to={'/'}>
                    <img className='xui-img-200' src={NavbarLogo} alt="logo" />
                </Link>
            </div>
            <div className="links" placed="left">
                <div className='fixed'>
                    <ul>
                        <li>
                            <button onClick={logOut} className="xui-btn xui-lg-font-sz-80 xui-bdr-rad-half dap-bg-accent xui-text-white"><span className="xui-opacity-9">Log out</span></button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;