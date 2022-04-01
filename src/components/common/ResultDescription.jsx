import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selector } from '../../store/modules';
import { COLOR_DARKSET } from '../../variables';

const ResultDescription = () => {
  const user = useSelector(selector.getUser);
  const [highestScoreName, nextHighestScoreName] = useSelector(
    selector.getTwoHighestScoreNames,
  );
  const [lowestScoreName, nextLowestScoreName] = useSelector(
    selector.getTwoLowestScoreNames,
  );

  return (
    <span>
      직장생활과 관련하여 <HighLightText>{user?.name}님</HighLightText>은
      <HighLightText>{` ${highestScoreName}`}</HighLightText>
      과(와)
      <HighLightText>{` ${nextHighestScoreName}`}</HighLightText>
      을(를) 가장 중요하게 생각합니다.
      <br />
      반면에
      <HighLightText>{` ${lowestScoreName}`}</HighLightText>,
      <HighLightText>{` ${nextLowestScoreName}`}</HighLightText>
      은(는) 상대적으로 덜 중요하게 생각합니다.
    </span>
  );
};

const HighLightText = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  opacity: 0.8;
  color: ${COLOR_DARKSET.HIGHLIGHT_TEXT};

  :hover {
    opacity: 1;
  }
`;

export default ResultDescription;
