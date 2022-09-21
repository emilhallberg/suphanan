import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { uuid } from '../../utils/library';
import Button from '../../components/button/button';
import Header from './components/header';
import Magazines from './components/magazines/magazines';
import { projects } from '../../resources/data/projects';
import Project from './components/project/project';
import useLanguage from '../../hooks/useLanguage';

const SProjects = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 64px;
  &::after {
    content: '';
    padding-bottom: 64px;
  }
`;

const Projects: React.FC = () => {
  const lng = useLanguage();
  const { t } = useTranslation();
  return (
    <SProjects>
      <Header />
      <Magazines />
      {projects.map(({ id, images, title, text, current, bullets }, i) => (
        <Project key={id}>
          <Project.Image src={images[0].src} alt={images[0].alt} />
          <Project.Content>
            <Project.Title index={i + 1}>{title[lng]}</Project.Title>
            <Project.Text>{text[lng]}</Project.Text>
            {bullets && (
              <Project.Bullets>
                {bullets.map((b) => (
                  <Project.Bullet key={uuid()}>{b[lng]}</Project.Bullet>
                ))}
              </Project.Bullets>
            )}
            <Project.Button>
              {current && <Button label={t('projects.current')} />}
            </Project.Button>
          </Project.Content>
        </Project>
      ))}
    </SProjects>
  );
};

export default Projects;
