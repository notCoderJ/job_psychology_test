import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import selector from '../../store/selector';
import { getFixedDigits } from '../../utils';

const itemRange = ['특징', '직업선택', '직업생활'];

const ValueDescription = ({ labels }) => {
  const valueDescriptions = useSelector(selector.getValueDescriptions);
  const [firstHighLevelValue] = useSelector(selector.getTwoHighLevelValues);

  const initValueIndex = useMemo(
    () => firstHighLevelValue - 1,
    [firstHighLevelValue],
  );

  useEffect(() => {
    console.log('ㅅㄷ느ㅟㅏㅅ누', valueDescriptions);
  }, [valueDescriptions]);

  return labels.map((valueName, tableIndex) => (
    <StyledValueDescriptionTable
      hidden={tableIndex !== initValueIndex}
      key={`valueDesc-table-${valueName}${getFixedDigits(tableIndex)}`}
    >
      <thead>
        <StyledValueDescriptionTableRow colSpan="2">
          <th>{valueName}</th>
        </StyledValueDescriptionTableRow>
      </thead>
      <tbody>
        {valueDescriptions[tableIndex].map((valueDescription, rowIndex) => (
          <StyledValueDescriptionTableRow
            key={`${valueName}-${valueDescription}${getFixedDigits(rowIndex)}`}
          >
            <StyledValueDescriptionTableTh scope="row">
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
  border-radius: 10px;
  margin-left: 3vw;

  > thead {
    border-top: solid 1px white;
    white-space: nowrap;
    font-size: 1.5rem;
    > tr {
      > th {
        padding: 1.1rem 1rem;

        @media screen and (max-width: 480px) {
          padding: 0.8rem 0;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    margin: 5vh 2vw 0 2vw;
  }

  @media screen and (max-width: 480px) {
    width: 80vw;
    height: 80vw;
  }
`;

const StyledValueDescriptionTableRow = styled.tr`
  border-bottom: solid 1px white;

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledValueDescriptionTableTh = styled.th`
  white-space: nowrap;
  border-right: solid 1px white;

  @media screen and (max-width: 1024px) {
    padding: 0.7rem 0;
    border-bottom: solid 1px white;
    border-right: none;
  }

  @media screen and (max-width: 480px) {
    padding: 0.5rem 0;
    border-bottom: solid 1px white;
    border-right: none;
  }
`;

const StyledValueDescriptionTableTd = styled.td`
  padding: 2rem 1rem;
  text-align: left;

  @media screen and (max-width: 1280px) {
    padding: 1.2rem 1rem;
  }

  @media screen and (max-width: 1024px) {
    text-align: center;
  }

  @media screen and (max-width: 480px) {
    padding: 0.8rem 0;
  }
`;

export default ValueDescription;
