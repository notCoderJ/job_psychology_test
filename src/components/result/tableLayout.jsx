import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { COLOR_DARKSET } from '../../variables';

const TableLayout = ({
  textAlign,
  highlight,
  separate = true,
  border = {},
  contents,
}) => {
  const { head, body } = contents;
  const { borderWidth, borderStyle, borderColor } = border;

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
        <StyledTableBody textAlign={textAlign} number={highlight}>
          {drawTableRows()}
        </StyledTableBody>
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
  color: ${COLOR_DARKSET.TABLE_BODY_FONT};
  font-weight: bold;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'center')};

  ${(props) =>
    props.number &&
    css`
      td:nth-child(${props.number}) {
        background-color: ${COLOR_DARKSET.TABLE_HIGHLIGHT};
        color: ${COLOR_DARKSET.TABLE_HIGHLIGHT_FONT};
        width: 8vw;
        font-size: 1.1em;
        text-align: center;
      }
    `};

  @media screen and (max-width: 480px) {
    text-align: center;
  }
`;

const StyledTableTh = styled.th`
  border-width: ${(props) => (props.borderWidth ? props.borderWidth : '1px')};
  border-style: ${(props) => (props.borderStyle ? props.borderStyle : 'solid')};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : COLOR_DARKSET.TABLE_BORDER};
  padding: 0.7rem 1rem;
  font-size: 1.1em;
`;

const StyledTableTd = styled.td`
  border-width: ${(props) => (props.borderWidth ? props.borderWidth : '1px')};
  border-style: ${(props) => (props.borderStyle ? props.borderStyle : 'solid')};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : COLOR_DARKSET.TABLE_BORDER};
  padding: 0.7rem 1rem;
`;

export default TableLayout;
