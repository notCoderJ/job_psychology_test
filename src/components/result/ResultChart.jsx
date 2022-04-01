import React, { useMemo } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actions, selector } from '../../store/modules';
import { COLOR_DARKSET } from '../../variables';

const colorOpaqueScale = 1;
const convertColor = (scale, value) => {
  const [r, g, b] = COLOR_DARKSET.CHART.DATA;
  return `rgba(${r}, ${g}, ${b}, ${
    !scale ? 1 : value * (colorOpaqueScale / scale)
  })`;
};

const ResultChart = ({ labels }) => {
  const dispatch = useDispatch();
  const scores = useSelector(selector.getScores);
  const highestScoreIndex = useSelector(selector.getHighestScoreIndex);
  const maxScale = useMemo(
    () => scores && highestScoreIndex && scores[highestScoreIndex],
    [scores, highestScoreIndex],
  );

  return (
    <StyledResultChartWrapper>
      <PolarArea
        data={{
          labels,
          datasets: [
            {
              data: scores,
              backgroundColor: scores.map((score) =>
                convertColor(maxScale, score),
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
          onClick: (_, item) => {
            if (
              item[0]?.index === undefined ||
              item[0].index >= labels.length
            ) {
              return;
            }
            dispatch(actions.setCurrentValueDescription(item[0]?.index));
          },
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
