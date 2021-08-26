import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { JOB_INFO_URL } from '../../constants';
import { GRADE_NAMES, MAJOR_NAMES } from '../../constants/result';
import selector from '../../store/selector';
import { COLOR_DARKSET } from '../../variables';
import TableLayout from './tableLayout';

const AverageJobsByTypes = () => {
  // const
  const [jobsByGrade, jobsByMajor] = useSelector(selector.getJobData);

  const averageJobs = useCallback((jobsByType) => {
    const divisionByType = {};
    jobsByType.forEach(([seq, job, type]) => {
      const typeIndex = type - 1;
      divisionByType[typeIndex] = divisionByType[typeIndex]
        ? [...divisionByType[typeIndex], [seq, job]]
        : [[seq, job]];
    });

    return divisionByType;
  }, []);

  const averageJobsByGrade = useMemo(
    () => averageJobs(jobsByGrade),
    [jobsByGrade, averageJobs],
  );
  const averageJobsByMajor = useMemo(
    () => averageJobs(jobsByMajor),
    [jobsByMajor, averageJobs],
  );

  const changeJobInfoLink = useCallback(
    (jobInfo, typeNames) =>
      Object.keys(jobInfo).map((index) => [
        typeNames[index],
        [
          jobInfo[index].map(([seq, job]) => (
            <StyledJobInfoLink
              key={`${job}-${seq}`}
              href={`${JOB_INFO_URL}${seq}`}
              target="_blank"
              rel="noreferrer"
            >
              {job}
            </StyledJobInfoLink>
          )),
        ],
      ]),
    [],
  );

  return (
    <StyledAverageJobsByTypes>
      <p>{`내가 중요하게 생각하는 ${null}과(와) ${null}을(를) 만족시킬 수 있는 직업은 다음과 같습니다.`}</p>
      <StyledAverageJobsByGrade>
        <TableLayout
          highlight="1"
          border={{
            borderStyle: 'none',
          }}
          contents={{
            head: ['분야', '직업명'],
            body: changeJobInfoLink(averageJobsByGrade, GRADE_NAMES),
          }}
        />
      </StyledAverageJobsByGrade>
      <StyledAverageJobsByMajor>
        <TableLayout
          highlight="1"
          border={{
            borderStyle: 'none',
          }}
          contents={{
            head: ['분야', '직업명'],
            body: changeJobInfoLink(averageJobsByMajor, MAJOR_NAMES),
          }}
        />
      </StyledAverageJobsByMajor>
    </StyledAverageJobsByTypes>
  );
};

const StyledAverageJobsByTypes = styled.div``;
const StyledAverageJobsByGrade = styled.div``;
const StyledAverageJobsByMajor = styled.div``;

const StyledJobInfoLink = styled.a`
  text-decoration: none;
  padding: 0 0.3rem;
  color: ${COLOR_DARKSET.TABLE_BODY_FONT};
  :hover {
    color: ${COLOR_DARKSET.TABLE_HIGHLIGHT_FONT};
  }
`;

export default AverageJobsByTypes;
