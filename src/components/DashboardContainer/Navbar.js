import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Menu, RotateCw, Settings, Rows2, Grip, Search, LayoutGrid } from "lucide-react";
import AccountMenu from "./AccountMenu";
import { useLocation } from "react-router-dom";
import { useNotes } from "../../context/NotesContext";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useChangeView } from "../../context/ViewChangeContext";

function Navbar({ toggleSidebar }) {
    const [navTitle, setNavTitle] = useState("Keep");
    const { setSearchedText, searchedText } = useNotes();
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const { view, setView } = useChangeView();

    useEffect(() => {
        if (path === "") setNavTitle("Keep");
        else if (path === "notes") setNavTitle("Notes");
        else if (path === "archive") setNavTitle("Archive");
        else if (path === "trash") setNavTitle("Trash");
    }, [path]);

    return (
        <div className="dashboard-header">
            <div className="header-left">
                <div className="dashboard-header-left-container">
                    <div className="header-left-container-menu">
                        <Menu className="header-icons" onClick={toggleSidebar} />
                    </div>
                    <div className="header-left-container-logo">
                        <img
                            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                            alt="Image not Found"
                            onClick={() => setSearchedText("")} />
                    </div>
                    <div className="header-left-container-title" onClick={() => setSearchedText("")}>
                        {navTitle}
                    </div>
                </div>
            </div>
            <div className="header-right">
                <div className="dashboard-header-middle-container">
                    <div className="header-middle-search-icon">
                        <Search className="search-icon" />
                    </div>
                    <input
                        value={searchedText}
                        onChange={(e) => setSearchedText(e.target.value)}
                        className="header-middle-search-input"
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <div className="dashboard-header-right-container">
                    <div className="header-right-container-icons">
                        <div className="icon-div">
                            <Tooltip title="Refresh">
                                <IconButton>
                                    <RotateCw className="header-icons" />
                                </IconButton>
                            </Tooltip>
                            {/* <RotateCw className="header-icons" /> */}
                        </div>
                        <div className="icon-div row-icon">
                            {
                                view ?
                                    <Tooltip title="List View">
                                        <IconButton>
                                            <Rows2 className="header-icons" onClick={() => setView((prev) => !prev)} />
                                        </IconButton>
                                    </Tooltip> :
                                    <Tooltip title="Grid View">
                                        <IconButton>
                                            <LayoutGrid className="header-icons" onClick={() => setView((prev) => !prev)} />
                                            {/* <Rows2 className="header-icons" onClick={() => setView((prev) => !prev)} /> */}
                                        </IconButton>
                                    </Tooltip>
                            }
                            {/* <Rows2 className="header-icons" /> */}
                        </div>
                        <div className="icon-div">
                            <Tooltip title="Settings">
                                <IconButton>
                                    <Settings className="header-icons" />
                                </IconButton>
                            </Tooltip>
                            {/* <Settings className="header-icons" /> */}
                        </div>
                    </div>
                    <div className="header-right-container-account">
                        <div className="icon-div-account grid-icon">
                            <Tooltip title="Google Apps">
                                <IconButton>
                                    <Grip className="header-icons grid" />
                                </IconButton>
                            </Tooltip>
                            {/* <Grip className="header-icons grid" /> */}
                        </div>
                        <div className="icon-div-account">
                            <AccountMenu className="account-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
