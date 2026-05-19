import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import type { ChangeEvent } from "react";

type Props = {
    options: { value: string, label: string }[]
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    selectiveValue: string
}

export default function RadioButtonGroup({ options, onChange, selectiveValue }: Props) {
    return (
        <FormControl>
            <RadioGroup
                onChange={onChange}
                value={selectiveValue}
                sx={{my: 0}}
            >
                {options.map(({ value, label }) => (
                    <FormControlLabel
                        key={label}
                        control={<Radio color="secondary" sx={{ py: 0.7 }} />}
                        label={label}
                        value={value}
                    />
                ))}
            </RadioGroup>

        </FormControl>
    )
}