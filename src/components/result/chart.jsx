import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import selector from '../../store/selector';

const ResultChart = ({ labels }) => {
  const {
    allValues: values,
    // firstHighLevelValue,
    // secondHighLevelValue,
  } = useSelector(selector.getResultData);

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
              position: 'bottom',
            },
          },
          ticks: {
            z: 1,
          },
        }}
      />
    </StyledResultChartWrapper>
  );
};

const StyledResultChartWrapper = styled.div`
  background-color: #ffedfe;
  border-radius: 12px;
  width: 55vh;
  height: 55vh;

  @media screen and (max-width: 480px) {
    width: 45vh;
    height: 45vh;
  }
`;

export default ResultChart;
