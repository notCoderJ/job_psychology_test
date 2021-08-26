import React, { useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import selector from '../../store/selector';

// 컬러 농도 구하는 식... 보고 써먹을지 말지...
// function colorize(opaque, hover, ctx) {
//   var v = ctx.raw;
//   var c =
//     v < 35 ? '#D60000' : v < 55 ? '#F46300' : v < 75 ? '#0358B6' : '#44DE28';

//   var opacity = hover ? 1 - Math.abs(v / 150) - 0.2 : 1 - Math.abs(v / 150);

//   return opaque ? c : Utils.transparentize(c, opacity);
// }

// function hoverColorize(ctx) {
//   return colorize(false, true, ctx);
// }

const ResultChart = ({ labels }) => {
  const {
    allValues: values,
    // firstHighLevelValue,
    // secondHighLevelValue,
  } = useSelector(selector.getResultData);

  useEffect(() => {
    console.log('먼데 라비레', labels);
  }, [labels]);

  // const test = () => {
  //   console.log('testdfnslfdsnfl');
  // };

  return (
    <StyledResultChartWrapper>
      <PolarArea
        data={{
          labels,
          datasets: [
            {
              label: '# of Votes',
              data: values,
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
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          ticks: {
            z: 1,
          },
        }}
      />
      {/* <Radar
          data={{
            labels,
            datasets: [
              {
                label: '# of Votes',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scale: {
              ticks: { beginAtZero: true },
              maintainAspectRatio: false,
            },
          }}
        /> */}
    </StyledResultChartWrapper>
  );
};

const StyledResultChartWrapper = styled.div`
  background-color: #ffedfe;
  border-radius: 12px;
  width: 100%;
  height: 100%; // 조정해야대아아아아

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export default ResultChart;
