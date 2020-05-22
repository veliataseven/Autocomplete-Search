import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  height: 300px;
  border: 2px solid #aaa;
  border-radius: 4px;
  width: 60%;
  margin: auto;
  margin-top: 50px;
  text-align: center;
  padding-top: 50px;
  font-family: Arial;
  font-size: 2rem;
`;

const DummyContent = () => {
  return <Content>Some Contents..</Content>;
};

export default DummyContent;
