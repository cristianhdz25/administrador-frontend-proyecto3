
import { format } from 'date-fns'
import { useState } from 'react'
import { Calendar } from 'phosphor-react'
import { Button, DatePicker, Popover, PopoverContent, PopoverTrigger } from 'keep-react'

const DatePickerComponent = ({ handleDate }) => {
  const [date, setDate] = useState(null);

  const handleDateSelection = (selectedDate) => {
    setDate(selectedDate);
    handleDate(selectedDate);
  };



  return (
    <Popover showArrow={false} placement="bottom-start">
      <PopoverTrigger asChild>
        <Button
          type="button"
          className="w-[460px] justify-start gap-2 rounded-xl border border-metal-50 px-4 text-left text-body-4 font-normal text-metal-600 hover:bg-white active:focus:scale-100 dark:border-metal-900 dark:bg-metal-900 dark:text-white dark:hover:bg-metal-800"
          variant="outline"
          color="secondary"

        >
          <Calendar size={20} className="text-metal-400 dark:text-white" />
          {date ? format(date, 'PPP') : <span>Seleccione una fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 max-w-min">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={handleDateSelection}
          showOutsideDays={true}
        />
      </PopoverContent>
    </Popover>
  );
};


export default DatePickerComponent;
