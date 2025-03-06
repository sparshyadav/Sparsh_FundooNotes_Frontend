// import * as React from 'react';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import './ReminderIcon.scss';
// import { BellPlus } from 'lucide-react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import Button from '@mui/material/Button';

// export default function LongMenu({ handleIconClick, noteDetails }) {
//     const [date, setDate]=React.useState();
//     const [time, setTime]=React.useState();
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <div>
//             <BellPlus
//                 className="icons"
//                 onClick={handleClick}
//                 aria-controls={open ? "long-menu" : undefined}
//                 aria-haspopup="true"
//             />
//             <Menu
//                 id="long-menu"
//                 MenuListProps={{
//                     'aria-labelledby': 'long-button',
//                 }}
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 disableScrollLock={true}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                 }}
//                 slotProps={{
//                     paper: {
//                         style: {
//                             width: '300px',
//                             overflow: 'visible',
//                         },
//                     },
//                 }}
//             >
//                 <MenuItem className="long-menu-item" key="Add Label" >
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DemoContainer components={['DatePicker']}>
//                             <DatePicker label="Pick a Date" />
//                         </DemoContainer>
//                     </LocalizationProvider>
//                 </MenuItem>
//                 <MenuItem className="long-menu-item" key="Add Label">
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DemoContainer components={['TimePicker']}>
//                             <TimePicker label="Basic time picker" />
//                         </DemoContainer>
//                     </LocalizationProvider>
//                 </MenuItem>
//                 <div className='button-container'><Button variant="text" >Save</Button></div>
//                 {/* <MenuItem className="long-menu-item" key="Add Drawing" onClick={handleClose}>Add Drawing</MenuItem>
//                 <MenuItem className="long-menu-item" key="Make a Copy" onClick={handleClose}>Make a Copy</MenuItem>
//                 <MenuItem className="long-menu-item" key="Show Checkboxes" onClick={handleClose}>Show Checkboxes</MenuItem>
//                 <MenuItem className="long-menu-item" key="Copy to Google Docs" onClick={handleClose}>Copy to Google Docs</MenuItem>
//                 <MenuItem className="long-menu-item" key="Version History" onClick={handleClose}>Version History</MenuItem> */}
//             </Menu>
//         </div>
//     );
// }





import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './ReminderIcon.scss';
import { BellPlus } from 'lucide-react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Button from '@mui/material/Button';

export default function LongMenu({ handleIconClick }) {
    const [date, setDate] = React.useState(null);
    const [time, setTime] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSave = () => {
        if (date && time) {
            const formattedDate = date.format("YYYY-MM-DD");
            const formattedTime = time.format("HH:mm:ss.SSS");

            const dateTimeISO = `${formattedDate}T${formattedTime}Z`;

            handleIconClick('reminder', dateTimeISO);
        }
        handleClose();
    };


    return (
        <div>
            <BellPlus
                className="icons"
                onClick={handleClick}
                aria-controls={open ? "long-menu" : undefined}
                aria-haspopup="true"
            />
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                aria-hidden={!Boolean(anchorEl)}
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
                            width: '300px',
                            overflow: 'visible',
                        },
                    },
                }}
            >
                <MenuItem className="long-menu-item">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Pick a Date"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </MenuItem>
                <MenuItem className="long-menu-item">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker
                                label="Pick a Time"
                                value={time}
                                onChange={(newValue) => setTime(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </MenuItem>
                <div className='button-container'>
                    <Button variant="text" onClick={handleSave}>Save</Button>
                </div>
            </Menu>
        </div>
    );
}
