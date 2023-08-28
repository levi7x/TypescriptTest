import { Stack } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
interface IProps {
    open: boolean;
    onClose: () => void;
    onChangeFromDate: (fromDate: Dayjs | null) => void;
    onChangeToDate: (toDate: Dayjs | null) => void;
  }
  
  const OfDateRangeCalendar = (props: IProps) => {
    const { open, onClose, onChangeFromDate, onChangeToDate } = props;
    const calendarRef = useRef<HTMLDivElement | null>(null);
  
    const [from, setFrom] = useState<Dayjs | null>(null);
    const [to, setTo] = useState<Dayjs | null>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
          setTimeout(() => {
            onClose();
          }, 200);
        }
      };
  
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, onClose]);
  
    const handleFromChange = (date: Dayjs | null) => {
      setFrom(date);
      onChangeFromDate(date);
    };
  
    const handleToChange = (date: Dayjs | null) => {
      setTo(date);
      onChangeToDate(date);
    };
  
    return (
      <Stack
        direction="row"
        sx={{
          width: "auto",
          border: "solid 1px grey",
          zIndex: open ? 1000 : -1,
          visibility: open ? "visible" : "hidden",
          position: "relative",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
        }}
        ref={calendarRef}
      >
        <DateCalendar value={from} onChange={handleFromChange} />
        <DateCalendar value={to} onChange={handleToChange} />
      </Stack>
    );
  };
  
  export default OfDateRangeCalendar;
  