import * as React from 'react';
import styled from 'styled-components';
import Tag from './Tag';
import ResumeHeader from './ResumeHeader';
import ResumeSkills from './ResumeSkills';
import ProfessionalExperience from './ProfessionalExperience';

interface Props extends Resume {
  className?: string;
  tag?: Tag;
}

interface DefaultProps {
  professionalExperience: ProfessionalExperience[];
  tag: Tag;
}

export const Resume: React.SFC<Props> = props => {
  const {
    tag,
    className,
    name,
    title,
    lead,
    skills,
    professionalExperience,
    freelanceExperience,
    education,
    ...rest
  } = props as Props & DefaultProps;
  return (
    <Tag tag={tag} className={className} {...rest}>
      <ResumeHeader name={name} title={title} lead={lead} />
      <ResumeSkills title="Technical Skills" skills={skills} />
      <section>
        <h2>Professional Experience</h2>
        {professionalExperience.map(experience => (
          <ProfessionalExperience
            key={experience.organization}
            {...experience}
          />
        ))}
      </section>
    </Tag>
  );
};

Resume.defaultProps = {
  tag: 'section',
  professionalExperience: [],
} as DefaultProps;

Resume.displayName = 'Resume';

export default styled(Resume)`
  border: 1px solid #ccc;
  padding: 5px;
`;
