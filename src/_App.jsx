import React, { Component } from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import MediaStudio from "./components/MediaStudio";


const styles = {
    night: {
        color: "#fff",
        backgroundColor: "#000"
    },
    day: {
        color: "#000",
        backgroundColor: "#fff"
    }
};

const Headline = styled.h1`
  font-size: 3rem;

  ${({ theme }) =>
        css`
      color: ${styles[theme].color};
      background-color: ${styles[theme].backgroundColor};
    `};
`;

@inject("store")
@observer
class App extends Component {
    render() {
        const { UiStore, DifferentStore } = this.props.store;

        return (
            <div>
                <MediaStudio />
                <div
                    className="App"
                    onClick={e => {
                        e.preventDefault();
                        DifferentStore.setText("cats!");
                    }}
                >
                    Click this
                </div>
                <div
                    className="App"
                    onClick={e => {
                        e.preventDefault();
                        UiStore.toggleTheme();
                    }}
                >
                    <div>{ DifferentStore.text }</div>
                    <Headline theme={ UiStore.theme }>Hey!</Headline>
                </div>
            </div>
        );
    }
}

export default App;
