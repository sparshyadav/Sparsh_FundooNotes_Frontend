import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './LongMenu.scss';

export default function LongMenu({ handleIconClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            style: {
              width: '22ch',
              overflow: 'visible',
            },
          },
        }}
      >
        <MenuItem className='long-menu-item' key={'Delete Note'} onClick={() => {
          handleIconClick('trash')
          handleClose();
        }}>Delete a Note</MenuItem>
        <MenuItem className='long-menu-item' key={'Add Label'} onClick={handleClose}>Add Label</MenuItem>
        <MenuItem className='long-menu-item' key={'Add Drawing'} onClick={handleClose}>Add Drawing</MenuItem>
        <MenuItem className='long-menu-item' key={'Make a Copy'} onClick={handleClose}>Make a Copy</MenuItem>
        <MenuItem className='long-menu-item' key={'Show Checkboxes'} onClick={handleClose}>Show Checkboxes</MenuItem>
        <MenuItem className='long-menu-item' key={'Copy to Google Docs'} onClick={handleClose}>Copy to Google Docs</MenuItem>
        <MenuItem className='long-menu-item' key={'Version History'} onClick={handleClose}>Version History</MenuItem>
      </Menu>
    </div>
  );
}
