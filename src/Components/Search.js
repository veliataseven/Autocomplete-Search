import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import data from '../MOCK_DATA.json';

const Wrapper = styled.div`
  font-family: Arial;
  position: relative;
  width: 60%;
  margin: auto;
  margin-top: 50px;
`;

const Label = styled.label`
  position: absolute;
  font-size: 1.5rem;
  top: ${(props) => (props.labelPosition || props.text ? '-26px' : '12px')};
  left: 15px;
  transition: 0.7s;
  z-index: -1;
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: 2px solid #aaa;
  width: 100%;
  padding: 12px;
  padding-left: 45px;
  font-size: 1.2rem;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
`;

const List = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  background-color: white;
  max-height: 300px;
  border: 2px solid #aaa;
  border-radius: 4px;
  overflow: hidden;
  overflow-y: scroll;
  display: ${(props) => props.displaySuggestion};
  top: ${(props) => props.isListDirectionUp && '-305px'};
`;

const ListItem = styled.div`
  font-size: 1.2rem;
  padding: 8px 15px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Icon = styled.i`
  position: absolute;
  font-size: 1.5rem;
  top: 14px;
  left: 15px;
  color: grey;
  display: ${(props) => props.displayIcon};
`;

const IconArrow = styled.i`
  z-index: -1;
  position: absolute;
  font-size: 1.5rem;
  top: 14px;
  right: 15px;
  color: grey;
`;

const Search = () => {
  const [text, setText] = useState('');
  const [placeHolder, setPlaceHolder] = useState('');
  const [displaySuggestion, setDisplaySuggestion] = useState('none');
  const [displayIcon, setDisplayIcon] = useState('none');
  const [suggestion, setSuggestion] = useState([]);
  const [labelPosition, setLabelPosition] = useState(false);
  const [isListDirectionUp, setIsListDirectionUp] = useState(false);
  const node = useRef();

  React.useEffect(() => {
    const regex = new RegExp(`^${text}`, 'i');
    const filteredData = data
      .sort()
      .slice(0, 500)
      .filter((item) => regex.test(item.name));
    setSuggestion(filteredData);
  }, [text]);

  React.useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setDisplaySuggestion('none');
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setDisplaySuggestion('block');
  };

  const handleMouseOver = () => {
    setLabelPosition(true);
    setDisplaySuggestion('block');
    setDisplayIcon('block');
    setPlaceHolder('Type or search..');
  };

  const handleMouseOut = () => {
    setLabelPosition(false);
    !text && setDisplaySuggestion('none');
    !text && setDisplayIcon('none');
    setPlaceHolder('');
  };

  const list = suggestion.map((item, index) => (
    <ListItem
      onClick={() => {
        setText(item.name);
        setDisplaySuggestion('none');
      }}
      key={index}
    >
      {' '}
      {item.name}
    </ListItem>
  ));

  React.useEffect(() => {
    node.current.getBoundingClientRect().top + 355 > window.innerHeight &&
      setIsListDirectionUp(true);
  }, []);

  return (
    <Wrapper ref={node}>
      <StyledInput
        value={text}
        placeholder={placeHolder}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onChange={handleChange}
      ></StyledInput>
      <Label
        text={text}
        labelPosition={labelPosition}
        isListDirectionUp={isListDirectionUp}
        className="label"
      >
        Contact
      </Label>
      <Icon
        className="fa fa-search"
        onMouseOver={handleMouseOver}
        displayIcon={displayIcon}
      />
      <IconArrow className="fa fa-angle-down" />
      <List
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        displaySuggestion={displaySuggestion}
        isListDirectionUp={isListDirectionUp}
      >
        {list}
      </List>
    </Wrapper>
  );
};

export default Search;
