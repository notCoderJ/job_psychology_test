import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { JOB_INFO_URL, GRADE_NAMES, MAJOR_NAMES } from '../../constants/result';
import { selector } from '../../store/modules';
import { COLOR_DARKSET } from '../../variables';
import TableLayout from './TableLayout';

const averageJobs = (typeName, jobs) => {
  const divisionByType = {};
  const typeOffset = { grade: -1, major: 0 };

  jobs.forEach(([seq, job, type]) => {
    const typeIndex = type + typeOffset[typeName];
    divisionByType[typeIndex] = divisionByType[typeIndex]
      ? [...divisionByType[typeIndex], [seq, job]]
      : [[seq, job]];
  });

  return divisionByType;
};

const changeJobInfoLink = (jobInfo, typeNames) =>
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
  ]);

const AverageJobsByTypes = () => {
  const [jobsByGrade, jobsByMajor] = useSelector(selector.getJobInfo);
  const [highestScoreName, nextHighestScoreName] = useSelector(
    selector.getTwoHighestScoreNames,
  );

  return (
    <StyledAverageJobsByTypes>
      <p>{`내가 중요하게 생각하는 ${highestScoreName}과(와) ${nextHighestScoreName}을(를) 만족시킬 수 있는 직업은 다음과 같습니다.`}</p>
      <StyledAverageJobsByGrade>
        <StyledAverageJobsSubTitle>
          종사자 평균 학력별
        </StyledAverageJobsSubTitle>
        <TableLayout
          textAlign="left"
          highlight="1"
          border={{ style: 'none' }}
          contents={{
            head: ['분야', '직업명'],
            body: changeJobInfoLink(
              averageJobs('grade', jobsByGrade),
              GRADE_NAMES,
            ),
          }}
        />
        <StyledAdditionalNotice>
          직업명을 클릭하시면, 커리어넷 직업사전으로 이동하여 직업에 대한 더
          자세한 정보를 확인할 수 있습니다.
        </StyledAdditionalNotice>
      </StyledAverageJobsByGrade>
      <StyledAverageJobsByMajor>
        <StyledAverageJobsSubTitle>
          종사자 평균 전공별
        </StyledAverageJobsSubTitle>
        <TableLayout
          textAlign="left"
          highlight="1"
          border={{ style: 'none' }}
          contents={{
            head: ['분야', '직업명'],
            body: changeJobInfoLink(
              averageJobs('major', jobsByMajor),
              MAJOR_NAMES,
            ),
          }}
        />
        <StyledAdditionalNotice>
          직업명을 클릭하시면, 커리어넷 직업사전으로 이동하여 직업에 대한 더
          자세한 정보를 확인할 수 있습니다.
        </StyledAdditionalNotice>
      </StyledAverageJobsByMajor>
    </StyledAverageJobsByTypes>
  );
};

const StyledAverageJobsByTypes = styled.div`
  > p {
    text-align: left;
    font-size: 1.2rem;
  }
`;

const StyledAverageJobsSubTitle = styled.h3`
  font-size: 1.7rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 30px;
  border: solid 2px ${COLOR_DARKSET.TABLE_BORDER};
  background-color: ${COLOR_DARKSET.TABLE_HIGHLIGHT};
`;

const StyledAverageJobsByGrade = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledAverageJobsByMajor = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledAdditionalNotice = styled.span`
  margin-top: 0.1rem;
  font-size: 0.8rem;
  text-align: right;
  color: ${COLOR_DARKSET.TABLE_ADDITIONAL_NOTICE};

  @media screen and (max-width: 480px) {
    text-align: left;
  }
`;

const StyledJobInfoLink = styled.a`
  text-decoration: none;
  padding: 0 0.3rem;
  color: ${COLOR_DARKSET.TABLE_BODY_FONT};
  :hover {
    color: ${COLOR_DARKSET.TABLE_HIGHLIGHT_FONT};
  }
`;

export default AverageJobsByTypes;
