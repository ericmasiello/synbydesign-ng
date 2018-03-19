import * as React from 'react';
import styled from 'styled-components';
import Tag from './Tag';
import ProfessionalExperienceRole from './ProfessionalExperienceRole';

interface Props extends ProfessionalExperience {
  className?: string;
  tag?: Tag;
}

interface DefaultProps {
  tag: Tag;
  accomplishments: string[];
  roles: ProfessionalRole[];
}

export const ProfessionalExperience: React.SFC<Props> = props => {
  const {
    organization,
    roles,
    accomplishments,
    className,
    ...rest
  } = props as Props & DefaultProps;
  return (
    <Tag className={className} {...rest}>
      <hgroup>
        <h1>{organization}</h1>
        {roles.map(role => (
          <ProfessionalExperienceRole {...role} key={role.title} />
        ))}
      </hgroup>
      {accomplishments.length > 0 && (
        <section>
          <ul>
            {accomplishments.map(accomplishment => (
              <li key={accomplishment}>{accomplishment}</li>
            ))}
          </ul>
        </section>
      )}
    </Tag>
  );
};

ProfessionalExperience.defaultProps = {
  tag: 'article',
  accomplishments: [],
  roles: [],
} as DefaultProps;

ProfessionalExperience.displayName = 'ProfessionalExperience';

export default styled(ProfessionalExperience)``;
