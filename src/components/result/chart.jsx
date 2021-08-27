import React, { useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import selector from '../../store/selector';
import { COLOR_DARKSET } from '../../variables';

const colorOpaqueScale = 1;
const convertColor = (scale, value) => {
  const [r, g, b] = COLOR_DARKSET.CHART.DATA;
  return `rgba(${r}, ${g}, ${b}, ${value * (colorOpaqueScale / scale)})`;
};

const ResultChart = ({ labels }) => {
  const {
    allValues: values,
    // firstHighLevelValue,
    // secondHighLevelValue,
  } = useSelector(selector.getResultData);
  const valuesScale = useSelector(selector.getValueScoreScale);

  useEffect(() => {
    console.log('scale 뽝', valuesScale);
  }, [valuesScale]);

  return (
    <StyledResultChartWrapper>
      <PolarArea
        data={{
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: values.map((score) =>
                convertColor(valuesScale, score),
              ),
              borderWidth: 1,
            },
          ],
        }}
        options={{
          onClick: (e) => {
            console.log(e.chart);
          },
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
          scale: {},
          ticks: {
            z: 0,
          },
          // elements
        }}
      />
    </StyledResultChartWrapper>
  );
};

const StyledResultChartWrapper = styled.div`
  background-color: #ffedfe;
  border-radius: 12px;
  width: 30vw;
  height: 30vw;

  @media screen and (max-width: 1024px) {
    width: 65vw;
    height: 65vw;
  }

  @media screen and (max-width: 480px) {
    width: 80vw;
    height: 80vw;
  }
`;

export default ResultChart;
