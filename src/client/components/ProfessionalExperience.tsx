import * as React from 'react';
import styled from 'styled-components';
import ProfessionalExperienceRole from './ProfessionalExperienceRole';
import PlainList from './PlainList';
import Type5 from './Type5';

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
    tag: Tag,
    organization,
    roles,
    accomplishments,
    className,
    ...rest
  } = props as Props & DefaultProps;
  return (
    <Tag className={className} {...rest}>
      <hgroup>
        <Type5 tag="h1" className="professional-experience__org">
          {organization}
        </Type5>
        {roles.map(role => (
          <ProfessionalExperienceRole {...role} key={role.title} />
        ))}
      </hgroup>
      {accomplishments.length > 0 && (
        <section>
          <PlainList>
            {accomplishments.map(accomplishment => (
              <li key={accomplishment}>{accomplishment}</li>
            ))}
          </PlainList>
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

export default styled(ProfessionalExperience)`
  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  .professional-experience__org {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
`;
