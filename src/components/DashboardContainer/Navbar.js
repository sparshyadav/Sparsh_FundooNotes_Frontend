/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import './Navbar.scss';
import { Menu, RotateCw, Settings, Rows2, Grip, Search } from "lucide-react";
import AccountMenu from './AccountMenu';
import { useLocation } from 'react-router-dom';

function Navbar({ toggleSidebar }) {
    const [navTitle, setNavTitle] = useState('Keep');

    const location = useLocation();
    const path = location.pathname.split('/')[2];

    useEffect(() => {
        if (path === '') {
            setNavTitle('Keep');
        }
        else if (path === 'notes') {
            setNavTitle("Notes")
        }
        else if (path === 'archive') {
            setNavTitle("Archive");
        }
        else if (path === 'trash') {
            setNavTitle("Trash");
        }
    }, [path])

    return (
        <div className='dashboard-header'>
            <div className='header-left'>
                <div className='dashboard-header-left-container'>
                    <div className='header-left-container-menu'>
                        <Menu className='header-icons' onClick={toggleSidebar} />
                    </div>
                    <div className='header-left-container-logo'>
                        <img src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png' alt='Image not Found' />
                    </div>
                    <div className='header-left-container-title'>{navTitle}</div>
                </div>
            </div>
            <div className='header-right'>
                <div className='dashboard-header-middle-container'>
                    <div className='header-middle-search-icon'>
                        <Search className='search-icon' />
                    </div>
                    <input className='header-middle-search-input' type='text' placeholder='Search' />
                </div>
                <div className='dashboard-header-right-container'>
                    <div className='header-right-container-icons'>
                        <div className='icon-div'><RotateCw className='header-icons' /></div>
                        <div className='icon-div row-icon'><Rows2 className='header-icons' /></div>
                        <div className='icon-div'><Settings className='header-icons' /></div>
                    </div>
                    <div className='header-right-container-account'>
                        <div className='icon-div-account grid-icon'><Grip className='header-icons' /></div>
                        <div className='icon-div-account'>
                            <AccountMenu />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
