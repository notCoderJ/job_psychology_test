import React, { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { COLOR_DARKSET } from '../../variables';

const TableLayout = ({ highlight, separate = true, border = {}, contents }) => {
  const { head, body } = contents;
  const { borderWidth, borderStyle, borderColor } = border;

  useEffect(() => {
    console.log('끼야호', body);
  }, [body]);

  const drawTableRows = useCallback(() => {
    if (Array.isArray(body[0])) {
      return body.map((bodyContents, index) => (
        <tr key={`tbody-row${index.toString()}`}>
          {bodyContents.map((content, itemIndex) => (
            <StyledTableTd
              key={`tbody-row${index.toString()}-item${itemIndex.toString()}`}
              borderWidth={borderWidth}
              borderStyle={borderStyle}
              borderColor={borderColor}
            >
              {content}
            </StyledTableTd>
          ))}
        </tr>
      ));
    }

    return (
      <tr>
        {body.map((content, index) => (
          <StyledTableTd
            key={`tbody-row0-item${index.toString()}`}
            borderWidth={borderWidth}
            borderStyle={borderStyle}
            borderColor={borderColor}
          >
            {content}
          </StyledTableTd>
        ))}
      </tr>
    );
  }, [body, borderWidth, borderStyle, borderColor]);

  return (
    <StyledTable separate={separate}>
      {Array.isArray(head) && (
        <StyledTableHead>
          <tr>
            {head.map((content, index) => (
              <StyledTableTh
                borderWidth={borderWidth}
                borderStyle={borderStyle}
                borderColor={borderColor}
                key={`thead-item${index.toString()}`}
                scope="col"
              >
                {content}
              </StyledTableTh>
            ))}
          </tr>
        </StyledTableHead>
      )}
      {Array.isArray(body) && (
        <StyledTableBody number={highlight}>{drawTableRows()}</StyledTableBody>
      )}
    </StyledTable>
  );
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: ${(props) => (props.separate ? 'separate' : 'collapse')};
`;

const StyledTableHead = styled.thead`
  background-color: ${COLOR_DARKSET.TABLE_HIGHLIGHT};

  font-weight: bold;
`;

const StyledTableBody = styled.tbody`
  background-color: ${COLOR_DARKSET.TABLE_BODY};
  color: ${COLOR_DARKSET.TABLE_BODY_FONT}; // TODO: 컬러 정의
  font-weight: bold;

  ${(props) =>
    props.number &&
    css`
      td:nth-child(${props.number}) {
        background-color: ${COLOR_DARKSET.TABLE_HIGHLIGHT};
        color: ${COLOR_DARKSET.TABLE_HIGHLIGHT_FONT};
        white-space: nowrap;
      }
    `};
`;

const StyledTableTh = styled.th`
  border-width: ${(props) => (props.borderWidth ? props.borderWidth : '1px')};
  border-style: ${(props) => (props.borderStyle ? props.borderStyle : 'solid')};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : COLOR_DARKSET.TABLE_BORDER};
  padding: 0.5rem 1rem;
`;

const StyledTableTd = styled.td`
  border-width: ${(props) => (props.borderWidth ? props.borderWidth : '1px')};
  border-style: ${(props) => (props.borderStyle ? props.borderStyle : 'solid')};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : COLOR_DARKSET.TABLE_BORDER};
  padding: 0.5rem 1rem;
`;

export default TableLayout;
