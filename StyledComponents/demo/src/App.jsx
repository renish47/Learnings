import styled from "styled-components";

const StyledButton = styled.button`
  border: 0;
  background-color: #79caea;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 20px;
`;

function App() {
  return (
    <div>
      <StyledButton>Button</StyledButton>
    </div>
  );
}

export default App;
