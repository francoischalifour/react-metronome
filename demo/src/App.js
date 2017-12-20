import React, { Component } from 'react'
import styled from 'styled-components'
import MdPlayArrow from 'react-icons/lib/md/play-arrow'
import MdPause from 'react-icons/lib/md/pause'
import Metronome from 'react-metronome'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.header`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-variant-numeric: tabular-nums;
  & small {
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    font-size: 0.8rem;
  }
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`

const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  background-color: #000;
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: #fff;
  font-size: 5rem;
`

const TabularNums = styled.p`
  font-variant-numeric: tabular-nums;
`

class App extends Component {
  render() {
    return (
      <Metronome
        tempo={120}
        render={({
          tempo,
          beatsPerMeasure,
          playing,
          beat,
          onPlay,
          onTempoChange,
        }) => (
          <Container>
            <Header>
              <div>
                {tempo} <small>BPM</small>
              </div>
              <div>
                {beatsPerMeasure}/{beatsPerMeasure} <small>T.S.</small>
              </div>
            </Header>

            <Main>
              <input
                type="range"
                min={40}
                max={240}
                value={tempo}
                onChange={event => onTempoChange(event.target.value)}
              />

              <TabularNums>
                {beat}/{beatsPerMeasure}
              </TabularNums>

              <PlayButton onClick={onPlay}>
                {playing ? <MdPause /> : <MdPlayArrow />}
              </PlayButton>
            </Main>
          </Container>
        )}
      />
    )
  }
}

export default App
