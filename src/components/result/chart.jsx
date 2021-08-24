import React from 'react';
import { PolarArea } from 'react-chartjs-2';

// const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [1, 2, 3, 4, 5],
//       backgroundColor: [
//         'rgba(138, 84, 247, 0.9)',
//         'rgba(138, 84, 247, 0.9)',
//         'rgba(153, 102, 255, 0.4)',
//         'rgba(153, 102, 255, 0.6)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(153, 102, 255, 0.3)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

const ResultChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [1, 2, 3, 4, 5],
        backgroundColor: [
          'rgba(138, 84, 247, 0.9)',
          'rgba(138, 84, 247, 0.9)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(153, 102, 255, 0.3)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <PolarArea
        data={data}
        width={200}
        height={100}
        options={
          {
            // maintainAspectRatio: false,
          }
        }
        // options={{ maintainAspectRatio: false }}
      />
    </>
  );
};

export default ResultChart;
