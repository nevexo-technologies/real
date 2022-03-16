import { Typography, FormHelperText, Box, FormControl, RadioGroup, Radio, FormControlLabel, useMediaQuery } from "@mui/material";
import { useEffect } from "react";

export default function RadioGroupResponsive({ id, label, helper, errors, defaultValue, onChange, type, inLine, customOptions }) {
    const isInline = (useMediaQuery(theme => theme.breakpoints.down('md')) ? false : true) && inLine;
    const formChoices = {
        'frequency': [
            {
                value: 1,
                label: "Deloc"
            },
            {
                value: 2,
                label: "Foarte Rar"
            },
            {
                value: 3,
                label: "Rar"
            },
            {
                value: 4,
                label: "Des"
            },
            {
                value: 5,
                label: "Foarte des"
            }
        ],
        'quantity': [
            {
                value: 1,
                label: "Deloc"
            },
            {
                value: 2,
                label: "Foarte puțin"
            },
            {
                value: 3,
                label: "Puțin"
            },
            {
                value: 4,
                label: "Mult"
            },
            {
                value: 5,
                label: "Foarte mult"
            }
        ],
        'quality': [
            {
                value: 1,
                label: "Foarte slab"
            },
            {
                value: 2,
                label: "Slab"
            },
            {
                value: 3,
                label: "Moderat"
            },
            {
                value: 4,
                label: "Bun"
            },
            {
                value: 5,
                label: "Foarte bun"
            }
        ],
        'boolean': [
            {
                value: 1,
                label: "Da"
            },
            {
                value: 0,
                label: "Nu"
            },
        ],
        'ternary': [
            {
                value: 2,
                label: "Da"
            },
            {
                value: 1,
                label: "Parțial"
            },
            {
                value: 0,
                label: "Nu"
            },
        ],
    }

    return (
        <>
            <Typography id={`${id}-label`}>{label}</Typography>
            <FormHelperText>{helper}</FormHelperText>
            <FormHelperText error>{errors}</FormHelperText>
            <Box textAlign={isInline ? 'center' : 'left'}>
                <FormControl required>
                    <RadioGroup
                        row={isInline ? true : false}
                        aria-labelledby={`${id}-label`}
                        defaultValue={defaultValue}
                        onChange={onChange}
                    >
                        {Object.keys(formChoices).includes(type) && formChoices[type].map((item, idx) => {
                            return <FormControlLabel key={idx} value={item.value} control={<Radio />} label={item.label} labelPlacement={isInline ? 'bottom' : 'right'} />
                        })}

                        {type == 'custom' && customOptions.map((item, idx) => {
                            return <FormControlLabel key={idx} value={item.value} control={<Radio />} label={item.label} labelPlacement={isInline ? 'bottom' : 'right'} />
                        })}

                    </RadioGroup>
                </FormControl>
            </Box>
            {!(Object.keys(formChoices).includes(type) || type == "custom") && <pre>You have passed a choice type that does not exist.</pre>}
        </>
    );
}