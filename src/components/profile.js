import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PictureContainer = styled.div`
  font-size: 5px;
  line-height: 2px;
  border-radius: 50%;
  overflow: hidden;
  width: 200px;
  height: 200px;
  margin: 10px 0;
  background-color: black;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  height: 100%;
  font-family: Inconsolata;
`;

const Line = styled.div``;

const Profile = () => {
  const { data } = useStaticQuery(graphql`
    {
      dataJson {
        data {
          b
          g
          r
          v
        }
      }
    }
  `).dataJson;

  return (
    <ProfileContainer>
      <PictureContainer>
        {data.map(line => (
          <Line>
            {line.map(char => (
              <span style={{ color: `rgb(${char.r},${char.g},${char.b})` }}>
                {char.v}
              </span>
            ))}
          </Line>
        ))}
      </PictureContainer>
      <header>
        <h1>Zaratan</h1>
        <h3>Les élucubrations d'un developeur fatigué</h3>
        <p>
          Développeur, ludiste, admin sys, grimpeur et cuisinier à mes heures.
          Je suis curieux de tout, tout le temps. J’aime découvrir de nouvelles
          choses et les partager.
        </p>
      </header>
      <section>
        <h2>Me contacter</h2>
        <ul>
          <li>
            <FontAwesomeIcon icon="envelope" />{' '}
            <a
              href="mailto:denis.pasin@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              denis.pasin@gmail.com
            </a>
          </li>
          <li>
            <FontAwesomeIcon icon={['fab', 'github']} />{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/denispasin"
            >
              denispasin
            </a>
          </li>
          <li>
            <FontAwesomeIcon icon={['fab', 'twitter']} />{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/zaratan"
            >
              @zaratan
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>Me soutenir</h2>
        <ul>
          <li>
            <FontAwesomeIcon icon={['fab', 'patreon']} />{' '}
            <a
              href="https://www.patreon.com/zaratan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Patreon
            </a>
          </li>
          <li>
            <FontAwesomeIcon icon="mug-hot" />{' '}
            <a
              href="https://ko-fi.com/zaratan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ko-Fi
            </a>
          </li>
        </ul>
      </section>
    </ProfileContainer>
  );
};

export default Profile;
