import styled from "styled-components";

const HomepageComponent = styled.div`
  padding: 0 4rem;
  height: calc(100vh - 6.5rem);
  overflow-y: scroll;

  h2 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  #imgerr {
    width: auto;
    height: auto;
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const ImageLinearOpacity = styled.div`
  -webkit-mask-image: -webkit-gradient(linear, left 60%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
  `;

const LatestEpisodes = styled.section`
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  li {
    background: ${props => props.theme.colors.backgroundSecondary};
    border-bottom: 1px solid ${props => props.theme.colors.backgroundDeep};
    padding: 1.25rem;
    border-radius: 1.5rem;
    position: relative;

    display: flex;
    align-items: flex-start;

    img {
      width: 6rem;
      min-width: 6rem;
      height: 100%;
      border-radius: 1rem;
    }
  }

  button#addQueue {
    position: absolute;
    right: 2rem;
    bottom: 2rem;

    width: 2.5rem;
    height: 2.5rem;
    background: ${props => props.theme.colors.backgroundSecondary};
    border: 1px solid ${props => props.theme.colors.backgroundPrimary};
    border-radius: 0.675rem;
    font-size: 0;

    transition: filter 0.2s;

    img {
      width: 1.5rem;
      min-width: 1.5rem;
      height: 1.5rem;
    }

    &:hover {
      filter: brightness(0.95);
    }
  }

  button#playMusic {
    position: absolute;
    right: 5rem;
    bottom: 2rem;

    width: 2.5rem;
    height: 2.5rem;
    background: ${props => props.theme.colors.backgroundSecondary};
    border: 1px solid ${props => props.theme.colors.backgroundPrimary};
    border-radius: 0.675rem;
    font-size: 0;

    transition: filter 0.2s;

    img {
      width: 1.5rem;
      min-width: 1.5rem;
      height: 1.5rem;
    }

    &:hover {
      filter: brightness(0.95);
    }
  }

  @media (max-width: 1090px) {
    ul {
      grid-template-columns: 1fr;
    }

    li {
      width: 80vw;
    }
  }

  @media (max-width: 660px) {
    a {
      width: 90%;
    }
  }

  @media (max-width: 525px) {
    button {
      right: 0.6rem;
      bottom: 0.6rem;
    }
  }
`;

const ImageContainer = styled.div`
  width: 6rem;
  min-width: 6rem;
`;

const StyledButtom = styled.div`
  background-color: ${props => props.theme.colors.backgroundDeep};
  padding: 5px;
  display: flex;
  border-radius: 7px;

  :hover {
    cursor: pointer;
  }
`;

const ButtomPrevious = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem;

  h3 {
    color: #fff;
    margin-left: 5px;
  }
`;

const EpisodeDetails = styled.div`
  flex: 1;
  margin-left: 1rem;

  a {
    display: block;
    color: ${props => props.theme.colors.text800};
    font-family: Lexend, sans-serif;
    font-weight: 600;
    text-decoration: none;
    line-height: 1.4rem;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  p {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    max-width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.875rem;

    &:last-child {
      margin-left: 0.5rem;
      padding-left: 0.5rem;
      position: relative;

      &::before {
        content: "";
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background: #ddd;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  @media (max-width: 600px) {
    p {
      display: none;
    }
  }
`;

const AllEpisodes = styled.section`
  padding-bottom: 2rem;
  margin-bottom: 8rem;

  @media (max-width: 720px) {
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;

const AllEpisodesTable = styled.table`
  width: 100%;

  th,
  td {
    padding: 0.75rem;
    border-bottom: 1px solid ${props => props.theme.colors.text100};
  }

  th {
    color: ${props => props.theme.colors.text200};
    text-transform: uppercase;
    font: 500 0.7rem Lexend, sans-serif;
    text-align: left;
  }

  td {
    font-size: 0.875rem;

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.5rem;
    }

    a {
      color: ${props => props.theme.colors.text800};
      font-family: Lexend, sans-serif;
      font-weight: 600;
      text-decoration: none;
      line-height: 1.4rem;
      font-size: 1rem;

      &:hover {
        text-decoration: underline;
      }
    }

    button {
      width: 2rem;
      height: 2rem;
      background: ${props => props.theme.colors.backgroundSecondary};
      border: 1px solid ${props => props.theme.colors.backgroundDeep};
      border-radius: 0.5rem;
      font-size: 0;

      transition: filter 0.2s;

      img {
        width: 1.25rem;
        height: 1.25rem;
      }

      &:hover {
        filter: brightness(0.95);
      }
    }
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;

const AllEpisodesCard = styled.section`
  display: none;
  margin-bottom: 9rem;

  ul {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  li {
    width: 80vw;
    background: ${props => props.theme.colors.backgroundSecondary};
    border-bottom: 1px solid ${props => props.theme.colors.backgroundDeep};
    padding: 1.25rem;
    border-radius: 1.5rem;
    position: relative;

    display: flex;
    align-items: start;

    img {
      width: 6rem;
      min-width: 6rem;
      height: 6rem;
      border-radius: 1rem;
    }
  }

  button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;

    width: 2.5rem;
    height: 2.5rem;
    background: ${props => props.theme.colors.backgroundSecondary};
    border: 1px solid ${props => props.theme.colors.backgroundPrimary};
    border-radius: 0.675rem;
    font-size: 0;

    transition: filter 0.2s;

    img {
      width: 1.5rem;
      min-width: 1.5rem;
      height: 1.5rem;
    }

    &:hover {
      filter: brightness(0.95);
    }
  }
  button#playMusic {
    position: absolute;
    right: 5rem;
    bottom: 2rem;

    width: 2.5rem;
    height: 2.5rem;
    background: ${props => props.theme.colors.backgroundSecondary};
    border: 1px solid ${props => props.theme.colors.backgroundPrimary};
    border-radius: 0.675rem;
    font-size: 0;

    transition: filter 0.2s;

    img {
      width: 1.5rem;
      min-width: 1.5rem;
      height: 1.5rem;
    }

    &:hover {
      filter: brightness(0.95);
    }
  }

  @media (max-width: 1000px) {
    display: grid;
  }

  @media (max-width: 660px) {
    a {
      width: 90%;
    }
  }

  @media (max-width: 525px) {
    button#addQueue {
      right: 0.6rem;
      bottom: 0.6rem;
    }
    button#playMusic {
      right: 3.6rem;
      bottom: 0.6rem;
    }
  }
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  svg.search-icon {
    position: absolute;
    left: 1.25rem;
    color: ${props => props.theme.colors.text200};
    width: 1.25rem;
    height: 1.25rem;
    pointer-events: none;
    transition: color 0.3s;
  }

  &:focus-within svg.search-icon {
    color: ${props => props.theme.colors.secondary};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.25rem 0.8rem 3rem;
  border-radius: 30px;
  border: 2px solid ${props => props.theme.colors.primary300};
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text800};
  font-size: 1rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

  &::placeholder {
    color: ${props => props.theme.colors.text200};
  }

  &:focus {
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 4px 12px rgba(4, 211, 97, 0.15);
  }
`;

export const SearchMessage = styled.span`
  color: ${props => props.theme.colors.text500};
  font-size: 0.825rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
  font-family: Inter, sans-serif;
  transition: all 0.2s ease;
`;

export const PremiumShuffleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  border: 0;
  border-radius: 30px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(4, 211, 97, 0.15);

  img, svg {
    width: 1.25rem;
    height: 1.25rem;
    filter: brightness(0) invert(1);
  }

  &:hover:not(:disabled) {
    filter: brightness(1.05);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(4, 211, 97, 0.25);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 720px) {
    padding: 0.8rem;
    span {
      display: none;
    }
  }
`;

export { ImageLinearOpacity, HomepageComponent, LatestEpisodes, EpisodeDetails, AllEpisodes, ImageContainer, AllEpisodesTable, AllEpisodesCard, ButtomPrevious, StyledButtom};