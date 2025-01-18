import React from 'react';
import DateList from './components/dateList';

const DateLists = ['2024-01-16', '2021-12-12'];

function List() {
  return (
    <div className='flex min-h-screen flex-col gap-4 p-4'>
      {DateLists.map((date, index) => (
        <DateList date={date} key={index} />
      ))}
    </div>
  );
}

export default List;
