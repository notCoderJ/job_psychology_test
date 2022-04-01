import React from 'react';
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
  const tableRows = Array.isArray(body[0]) ? (
    body.map((bodyContents, index) => (
      <tr key={`tbody-row${index.toString()}`}>
        {bodyContents.map((content, itemIndex) => (
          <StyledTableTd
            key={`tbody-row${index.toString()}-item${itemIndex.toString()}`}
            border={border}
          >
            {content}
          </StyledTableTd>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      {body.map((content, index) => (
        <StyledTableTd
          key={`tbody-row0-item${index.toString()}`}
          border={border}
        >
          {content}
        </StyledTableTd>
      ))}
    </tr>
  );

  return (
    <StyledTable separate={separate}>
      {Array.isArray(head) && (
        <StyledTableHead>
          <tr>
            {head.map((content, index) => (
              <StyledTableTh
                border={border}
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
          {tableRows}
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

const borderStyle = css`
  ${({ border: { width, style, color } }) => css`
    border-width: ${width || '1px'};
    border-style: ${style || 'solid'};
    border-color: ${color || COLOR_DARKSET.TABLE_BORDER};
  `}
`;

const StyledTableTh = styled.th`
  ${borderStyle}
  padding: 0.7rem 1rem;
  font-size: 1.1em;
`;

const StyledTableTd = styled.td`
  ${borderStyle}
  padding: 0.7rem 1rem;
`;

export default TableLayout;
