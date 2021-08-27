import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import selector from '../../store/selector';
import { getFixedDigits } from '../../utils';
import { COLOR_DARKSET } from '../../variables';

const itemRange = ['특징', '직업선택', '직업생활'];

const ValueDescription = ({ labels }) => {
  const valueDescriptions = useSelector(selector.getValueDescriptions);
  const currentValueDescription = useSelector(
    selector.getCurrentValueDescription,
  );

  return labels.map((valueName, tableIndex) => (
    <StyledValueDescriptionTable
      hidden={tableIndex !== currentValueDescription}
      key={`valueDesc-table-${valueName}${getFixedDigits(tableIndex)}`}
    >
      <StyledSelectedValue>{valueName}</StyledSelectedValue>
      <tbody>
        {valueDescriptions[tableIndex].map((valueDescription, rowIndex) => (
          <StyledValueDescriptionTableRow
            key={`${valueName}-${valueDescription}${getFixedDigits(rowIndex)}`}
          >
            <StyledValueDescriptionTableTh>
              {itemRange[rowIndex]}
            </StyledValueDescriptionTableTh>
            <StyledValueDescriptionTableTd>
              {valueDescription}
            </StyledValueDescriptionTableTd>
          </StyledValueDescriptionTableRow>
        ))}
      </tbody>
    </StyledValueDescriptionTable>
  ));
};

const StyledValueDescriptionTable = styled.table`
  border-collapse: collapse;
  height: 35vh;

  @media screen and (max-width: 1024px) {
    height: fit-content;
  }
`;

const StyledSelectedValue = styled.caption`
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0 1rem;
  color: ${COLOR_DARKSET.HIGHLIGHT_TITLE};
  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const StyledValueDescriptionTableRow = styled.tr`
  border-top: solid 1px ${COLOR_DARKSET.TABLE_BORDER};
  border-bottom: solid 1px ${COLOR_DARKSET.TABLE_BORDER};

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledValueDescriptionTableTh = styled.th`
  border-right: solid 1px ${COLOR_DARKSET.TABLE_BORDER};
  padding: 0 1.5vw;
  white-space: nowrap;
  font-size: 1.2rem;

  @media screen and (max-width: 1024px) {
    padding: 0.7rem 0;
    border-bottom: solid 1px ${COLOR_DARKSET.TABLE_BORDER};
    border-right: none;
    font-size: 1.1rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0.5rem 0;
  }
`;

const StyledValueDescriptionTableTd = styled.td`
  padding: 2vh 1vw 2vh 1.5vw;
  text-align: left;

  @media screen and (min-width: 1280px) {
    padding: 3vh 2vw;
  }

  @media screen and (max-width: 1024px) {
    text-align: center;
  }

  @media screen and (max-width: 480px) {
    padding: 2.5vh 0;
  }
`;

export default ValueDescription;
