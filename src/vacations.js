import React from 'react';
import moment from 'moment';

const Vacations = ({vacations})={
  return (
    <h2>Vacations</h2>
    <ul>
    {
      vacations.map(vaction => {
        return (
          <li key={ vacation.id }>
          <div>
              { moment(vacation.startDate).format('ddd MM/DD/YYYY')}
            </div>
            <div> To </div>
            <div>
              { moment(vacation.endDate).format('ddd MM/DD/YYYY') }
            </div>
            <div>
            { moment(vacation.endDate).diff(moment(vacation.startDate), 'days')}Days
            </div>
          </li>
        )
      })
    }
    </ul>
  )
}
