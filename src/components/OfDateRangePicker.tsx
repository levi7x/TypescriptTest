import { Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const FORMAT = "YYYY/MM/DD";

interface IProps {
    onDateChange?: (date: string | null) => void;
}

const OfDateRangePicker = (props: IProps) => {
    let { onDateChange } = props;

    const handleChange = (date: Dayjs | null) => {
        if(onDateChange) {
            onDateChange(date ? date.toString() : null);
        }
    }


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack flexDirection="row" sx={{maxWidth: 400}}>
          <DatePicker onChange={handleChange} format={FORMAT} />
          <DatePicker format={FORMAT} />
        </Stack>
      </LocalizationProvider>
    </>
  );
};

export default OfDateRangePicker;
