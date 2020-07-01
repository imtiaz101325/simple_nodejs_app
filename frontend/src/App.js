import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

const AppHeader = styled.h1``;

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 50vh;
`;

const SimpleTextArea = styled.textarea`
  width: 600px;
  height: 120px;
  border: 3px solid #cccccc;
  padding: 5px;
  font-family: Tahoma, sans-serif;
  background-image: url(bg.gif);
  background-position: bottom right;
  background-repeat: no-repeat;
  outline: none;
  resize: none;
  overflow: auto;
`;

const SubmitButton = styled.button`
  color: #494949;
  text-transform: uppercase;
  text-decoration: none;
  background: #ffffff;
  padding: 10px 20px;
  border: 4px solid #494949;
  display: inline-block;
  transition: all 0.4s ease 0s;

  :hover {
    color: #ffffff;
    background: #f6b93b;
    border-color: #f6b93b;
    transition: all 0.4s ease 0s;
  }
`;

const TEXT_QUERY = gql`
  {
    text
  }
`;

const TEXT_MUTATION = gql`
  mutation SetText($text: String!) {
    setText(text: $text)
  }
`;

function App() {
  const [inputText, setInputText] = useState("");
  const { loading, error, data } = useQuery(TEXT_QUERY);
  const [setText] = useMutation(TEXT_MUTATION);

  useEffect(() => {
    if (data && data.text) {
      setInputText(data.text);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <AppContainer>
      <AppHeader>Simple React App</AppHeader>
      <AppContent>
        <SimpleTextArea
          value={inputText}
          onChange={input => setInputText(input.target.value)}
          placeholder="Write something and press submit"
          cols="30"
          rows="5"
        />
        <SubmitButton
          onClick={() => setText({ variables: { text: inputText } })}
        >
          Submit
        </SubmitButton>
      </AppContent>
    </AppContainer>
  );
}

export default App;
