import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import AppContainer from "./components/AppContainer";
import SimpleTextArea from "./components/SimpleTextArea";
import SubmitButton from "./components/SubmitButton";
import Loading from "./components/Loading";

const AppHeader = styled.h1`
  color: #31b9c8;
`;

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Error = styled.p`
  color: #93372c;
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

export default function App() {
  const [inputText, setInputText] = useState("");
  const { loading, error, data } = useQuery(TEXT_QUERY);
  const [setText] = useMutation(TEXT_MUTATION);

  useEffect(() => {
    if (data && data.text) {
      setInputText(data.text);
    }
  }, [data]);

  return (
    <AppContainer>
      {loading && <Loading />}
      <AppHeader>Simple React App</AppHeader>
      <AppContent>
        <SimpleTextArea
          value={inputText}
          onChange={(input) => setInputText(input.target.value)}
          placeholder="Write something and press submit"
          cols="30"
          rows="5"
        />
        {error && <Error>Error loading data</Error>}
        <SubmitButton
          onClick={() => setText({ variables: { text: inputText } })}
        >
          Submit
        </SubmitButton>
      </AppContent>
    </AppContainer>
  );
}
