import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { RelatedExperience, Props } from '../RelatedExperience';
import RelatedExperienceWebsite from '../RelatedExperienceWebsite';

const base: Props = {
  title: 'Title',
  role: {
    title: 'Role title',
  },
  accomplishments: [],
};

it('should render', () => {
  const component = renderer.create(<RelatedExperience {...base} />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

it('should display additional classes', () => {
  const wrapper = shallow(<RelatedExperience {...base} className="my-class" />);

  expect(wrapper.hasClass('my-class')).toBe(true);
});

it('should render additional props', () => {
  const wrapper = shallow(
    <RelatedExperience {...base} data-test="my-attribute" />,
  );

  expect(wrapper.find('[data-test="my-attribute"]')).toHaveLength(1);
});

it('should render as a <article> by default', () => {
  const wrapper = shallow(<RelatedExperience {...base} />);

  expect(wrapper.type()).toBe('article');
});

it('should render as a custom tag', () => {
  const wrapper = shallow(<RelatedExperience {...base} tag="span" />);

  expect(wrapper.type()).toBe('span');
});

it('should render title', () => {
  const wrapper = shallow(<RelatedExperience {...base} />);

  expect(
    wrapper.find('[data-title-content]').props().dangerouslySetInnerHTML!
      .__html,
  ).toBe(base.title);
});

it('should render title as html', () => {
  const wrapper = shallow(
    <RelatedExperience {...base} title={'The <a href="#">link</a>'} />,
  );

  expect(
    wrapper.find('[data-title-content]').props().dangerouslySetInnerHTML!
      .__html,
  ).toBe('The <a href="#">link</a>');
});

it('should render meta data', () => {
  const props: Props = {
    ...base,
    meta: 'The meta',
  };
  const wrapper = mount(<RelatedExperience {...props} />);

  expect(wrapper.find('p[data-meta]').text()).toContain('The meta');
});

it('should render the role starting year', () => {
  const props: Props = {
    ...base,
    role: {
      ...base.role,
      yearFrom: '2018',
    },
  };
  const wrapper = mount(<RelatedExperience {...props} />);

  expect(wrapper.find('h1[data-title]').text()).toContain('(2018)');
});

it('should render the role title', () => {
  const wrapper = mount(<RelatedExperience {...base} />);

  expect(wrapper.find('h2[data-role-title]').text()).toContain(base.role.title);
});

it('should render the website', () => {
  const props: Props = {
    ...base,
    website: {
      url: 'http://www.synbydesign.com',
      title: 'Syn By Design',
      disabled: true,
    },
  };
  const wrapper = shallow(<RelatedExperience {...props} />);
  const website = wrapper.find(RelatedExperienceWebsite);

  expect(website.props().url).toEqual(props.website!.url);
  expect(website.props().title).toEqual(props.website!.title);
  expect(website.props().disabled).toEqual(props.website!.disabled);
});

it('should render accomplishments', () => {
  const accomplishments = ['foo', 'bar', 'baz'];
  const wrapper = shallow(
    <RelatedExperience {...base} accomplishments={accomplishments} />,
  );

  accomplishments.forEach(accomplishment => {
    expect(wrapper.containsMatchingElement(<li>{accomplishment}</li>)).toBe(
      true,
    );
  });
});
