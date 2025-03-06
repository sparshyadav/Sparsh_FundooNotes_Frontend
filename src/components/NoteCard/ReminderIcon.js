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
import dayjs from "dayjs";
import { errorToast } from '../../utils/Toast';

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
            const selectedDateTime = dayjs(date.format("YYYY-MM-DD") + " " + time.format("HH:mm:ss"));
            const currentDateTime = dayjs();

            if (selectedDateTime.isBefore(currentDateTime)) {
                errorToast("Please Select a Future Date");
                return;
            }

            const dateTimeISO = selectedDateTime.toISOString();

            handleIconClick("reminder", dateTimeISO);
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
