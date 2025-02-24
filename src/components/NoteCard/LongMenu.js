// import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import './LongMenu.scss'

// const options = [
//   'Delete Note',
//   'Add Label',
//   'Add Drawing',
//   'Make a Copy',
//   'Show Checkboxes',
//   'Copy to Google Docs',
//   'Version History'
// ];

// export default function LongMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? 'long-menu' : undefined}
//         aria-expanded={open ? 'true' : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           'aria-labelledby': 'long-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         slotProps={{
//           paper: {
//             style: {
//               width: '22ch',
//               overflow: 'visible', 
//             },
//           },
//         }}
//       >
//         {options.map((option) => (
//           <MenuItem className='long-menu-item' key={option} onClick={handleClose}>
//             {option}
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// }



import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './LongMenu.scss';

const options = [
  'Delete Note',
  'Add Label',
  'Add Drawing',
  'Make a Copy',
  'Show Checkboxes',
  'Copy to Google Docs',
  'Version History'
];

export default function LongMenu() {
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
        disableScrollLock={true} // Prevents the page from scrolling when the menu is open
        anchorOrigin={{
          vertical: 'bottom', // Fix it to the NoteCard
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
        {options.map((option) => (
          <MenuItem className="long-menu-item" key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
