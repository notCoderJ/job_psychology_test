import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
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

  useEffect(() => {
    console.log('dssfsd', firstHighLevelValue);
  }, [firstHighLevelValue]);

  return labels.map((valueName, tableIndex) => (
    <table
      hidden={tableIndex !== initValueIndex}
      key={`valueDesc-table-${valueName}${getFixedDigits(tableIndex)}`}
    >
      <thead>
        <tr>
          <th colSpan="2">{valueName}</th>
        </tr>
      </thead>
      <tbody>
        {valueDescriptions[tableIndex].map((valueDescription, rowIndex) => (
          <tr
            key={`${valueName}-${valueDescription}${getFixedDigits(rowIndex)}`}
          >
            <th scope="row">{itemRange[rowIndex]}</th>
            <td>{valueDescription}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ));
};

export default ValueDescription;
