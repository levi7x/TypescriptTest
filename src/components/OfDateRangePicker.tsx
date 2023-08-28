import { Box, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
import OfDateRangeCalendar from "./OfDateRangeCalendar";

const FORMAT = "YYYY/MM/DD";

interface IProps {
    onFromDateChange?: (date: string | null) => void;
    onToDateChange?: (date: string | null) => void;
}
const OfDateRangePicker = (props: IProps) => {
    let { onFromDateChange, onToDateChange } = props;
  
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [selectedFromDate, setSelectedFromDate] = useState<Dayjs | null>(null);
    const [selectedToDate, setSelectedToDate] = useState<Dayjs | null>(null);
  
    const handleFromDateChange = (date: Dayjs | null) => {
      setSelectedFromDate(date);
      if (onFromDateChange) {
        onFromDateChange(date ? date.toString() : null);
      }
    };
  
    const handleToDateChange = (date: Dayjs | null) => {
      setSelectedToDate(date);
      if (onToDateChange) {
        onToDateChange(date ? date.toString() : null);
      }
    };
  
    const handleCalendarClose = () => {
      setIsCalendarOpen(false);
    };
  
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ border: "solid 2px red", width: 600 }}>
            <Stack flexDirection="row" sx={{ width: "50hw" }} alignItems="center" justifyContent="center">
              <DatePicker
                label={"From"}
                value={selectedFromDate}
                onChange={handleFromDateChange}
                format={FORMAT}
                slotProps={{
                  textField: {
                    onClick: () => setIsCalendarOpen(true),
                  },
                }}
                disableOpenPicker
              />
              <DatePicker
                label={"To"}
                value={selectedToDate}
                onChange={handleToDateChange}
                format={FORMAT}
                slotProps={{
                  textField: {
                    onClick: () => setIsCalendarOpen(true),
                  },
                }}
                disableOpenPicker
              />
            </Stack>
            <OfDateRangeCalendar open={isCalendarOpen} onClose={handleCalendarClose} onChangeFromDate={handleFromDateChange} onChangeToDate={handleToDateChange} />
          </Box>
        </LocalizationProvider>
      </>
    );
  };

export default OfDateRangePicker;