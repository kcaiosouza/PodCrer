import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.backgroundSecondary};
  height: 6.5rem;
  

  display: flex;
  align-items: center;

  padding: 2rem 4rem;

  border-bottom: 1px solid ${props => props.theme.colors.backgroundDeep};

  p {
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid ${props => props.theme.colors.backgroundDeep};
  }

  span {
    margin-left: auto;
    margin-right: 2rem;
    text-transform: capitalize;
  }

  #logo {
    margin-right: 10px;
  }

  #logo:hover {
    cursor: pointer;
  }

  #hoverList button {
    background: none;
    border: none;
    padding-right: 0.3rem;

    transition: filter 0.3s;
  }

  #hoverList:hover button {
    filter: brightness(0.85);
  }

  @media (max-width: 720px) {
    padding: 1rem 2rem;

    span {
      display: none;
    }

    p {
      margin-right: auto;
      display:none
    }
  }

  @media (max-width: 700px) {
    img {
      margin-right: auto;
    }
  }

  @media (max-width: 450px) {
    p {
      display: none;
    }
  }
`;