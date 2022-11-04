import { Typography, FormHelperText, FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

export default function CheckboxGroup({ id, label, helper, errors, defaultValue, onChange, options }) {
    const [checked, setChecked] = useState(()=>{
        let values = {}
        if(defaultValue) {
            defaultValue.forEach(element => {
                values[element] = true;
            });
        }

        return values;
    })

    function handleChange(e, idx) {
        setChecked((values) => ({ ...values, [idx]: e.target.checked }));
    }

    useEffect(() => {
        let validOptions = Object.keys(checked).filter(element=>checked[element]==true)

        onChange({target:{value:validOptions}})
    }, [checked])

    return (
        <>
            <Typography id={`${id}-label`}>{label}</Typography>
            <FormHelperText>{helper}</FormHelperText>
            <FormHelperText error>{errors}</FormHelperText>
            <FormGroup>
                {options.map((item, idx) => {
                    return <FormControlLabel key={idx} value={idx} checked={checked[idx]} onChange={(e) => handleChange(e,idx)} control={<Checkbox />} label={item} />
                })}
            </FormGroup>
        </>
    );
}