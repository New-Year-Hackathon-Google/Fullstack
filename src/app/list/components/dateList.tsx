interface DateListProps {
  date: string;
}

function DateList({ date }: DateListProps) {
  return (
    <div className='flex items-center rounded-lg border-2 border-emerald-400 p-4 shadow-md'>
      <div className='w-24 text-left text-sm font-medium text-gray-500'>
        {date}
      </div>
    </div>
  );
}

export default DateList;
