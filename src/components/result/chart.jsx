import React, { useCallback } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actions, selector } from '../../store/modules';
import { COLOR_DARKSET } from '../../variables';

const colorOpaqueScale = 1;
const convertColor = (scale, value) => {
  const [r, g, b] = COLOR_DARKSET.CHART.DATA;
  return `rgba(${r}, ${g}, ${b}, ${value * (colorOpaqueScale / scale)})`;
};

const ResultChart = ({ labels }) => {
  const dispatch = useDispatch();
  const {
    allValues: values,
    // firstHighLevelValue,
    // secondHighLevelValue,
  } = useSelector(selector.getResultData);
  const valuesScale = useSelector(selector.getValueScoreScale);

  const handleClickValue = useCallback(
    (e, legendItem) => {
      if (
        legendItem[0]?.index === undefined ||
        legendItem[0].index >= labels.length
      ) {
        return;
      }

      dispatch(actions.setCurrentValueDescription(legendItem[0]?.index));
    },
    [dispatch, labels],
  );

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
          layout: {
            padding: {
              top: 10,
              left: 10,
              right: 10,
              bottom: 10,
            },
          },
          onClick: handleClickValue,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        }}
      />
    </StyledResultChartWrapper>
  );
};

const StyledResultChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLOR_DARKSET.CHART.BACKGROUND};
  border-radius: 12px;
`;

export default ResultChart;
