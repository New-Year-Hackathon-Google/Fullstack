interface DateSelectionProps {
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => void;
}

const DateSelection = ({ handleChange }: DateSelectionProps) => {
  return (
    <div>
      <div className='space-x-8'>
        <select
          name='year'
          onChange={handleChange}
          className='rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500'
          required
        >
          <option value=''>Year</option>
          {[2025, 2026, 2027].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          name='month'
          onChange={handleChange}
          className='rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500'
          required
        >
          <option value=''>Month</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          name='day'
          onChange={handleChange}
          className='rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500'
          required
        >
          <option value=''>Day</option>
          {[...Array(31)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h1>일 기간</h1>
        <select
          name='month'
          onChange={handleChange}
          className='rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500'
          required
        ></select>
      </div>
    </div>
  );
};

export default DateSelection;
