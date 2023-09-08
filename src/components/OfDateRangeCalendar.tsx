import { Box, Stack, Divider } from "@mui/material";
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
        }, 220);
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
      sx={{
        width: "100%",
        borderRadius: "4px",
        zIndex: open ? 1000 : -1,
        visibility: open ? "visible" : "hidden",
        position: "relative",
        opacity: open ? 1 : 0,
        transform: `scale(1) translateY(${open ? 0 : -20}px)`, // Adjust the transform property here
        boxShadow: open ? '0px 3px 10px rgba(0,0,0,0.3)' : 'none',
        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      }}
      flexDirection={"row"}
      ref={calendarRef}
    >
      <DateCalendar sx={{ width: "100%" }} maxDate={to ?? undefined} value={from} onChange={handleFromChange} />
      <Divider orientation="vertical" variant="middle" flexItem />
      <DateCalendar sx={{ width: "100%" }} minDate={from ?? undefined} value={to} onChange={handleToChange} />
    </Stack>
  );
};

export default OfDateRangeCalendar;
