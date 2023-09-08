import { Box, Divider, Stack } from "@mui/material";
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
      <Stack sx={{ width: "50vh", margin: "auto", position: "relative" }}>
        {/* Date Pickers */}
        <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
          {/* Date Picker 1 */}
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
            maxDate={selectedToDate ?? undefined}
          />

          {/* Divider */}
          <Divider orientation="horizontal" variant="middle" flexItem/>

          {/* Date Picker 2 */}
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
            minDate={selectedFromDate ?? undefined}
          />
        </Stack>

        {/* Calendar */}
        {isCalendarOpen && (
          <Stack sx={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", zIndex: 999 }}>
            {/* Semi-transparent overlay */}
            <OfDateRangeCalendar
              open={isCalendarOpen}
              onClose={handleCalendarClose}
              onChangeFromDate={handleFromDateChange}
              onChangeToDate={handleToDateChange}
            />
          </Stack>
        )}
      </Stack>
    </LocalizationProvider>
      </>
    );
  };

export default OfDateRangePicker;