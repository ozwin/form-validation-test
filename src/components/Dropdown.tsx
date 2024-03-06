import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Menu } from '../interfaces';

interface Props {
    options: Menu[];
    label: String;
    register?: any;
    id: string;
}

const Dropdown: React.FC<Props> = (props: Props) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={20}
                {...props.register(props.id, { required: true })}
                label={props.label}
            // onChange={handleChange}
            >
                {/* {props.options.map(option => (
                    <MenuItem key={option.key} value={option.value}>
                        {option.key}
                    </MenuItem>
                ))} */}
            </Select>
        </FormControl>
    );
}

export default Dropdown;
