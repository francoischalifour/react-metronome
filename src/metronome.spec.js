/* eslint-env jest */

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import './__mocks__/global'
import Metronome from './'

Enzyme.configure({ adapter: new Adapter() })

describe('<Metronome />', () => {
  test('renders nothing', () => {
    expect(mount(<Metronome />).html()).toBe(null)
  })
})

describe('<Metronome render />', () => {
  test('renders children', () => {
    const renderSpy = jest.fn(() => <div />)
    const wrapper = mount(<Metronome render={renderSpy} />)

    expect(renderSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.find('div').length).toBe(1)
  })

  test('passes state to children', () => {
    let renderState
    mount(
      <Metronome
        render={state => {
          renderState = state
          return null
        }}
      />
    )

    expect(renderState).toHaveProperty('playing')
    expect(renderState).toHaveProperty('tempo')
    expect(renderState).toHaveProperty('beat')
    expect(renderState).toHaveProperty('beatsPerMeasure')
    expect(renderState).toHaveProperty('subdivision')
    expect(renderState).toHaveProperty('onTempoChange')
    expect(renderState).toHaveProperty('onPlay')
  })

  test('`onTempoChange` prop updates the `tempo` state', () => {
    let tempoProp
    const wrapper = mount(
      <Metronome
        render={({ onTempoChange, tempo }) => {
          tempoProp = tempo
          return <button onClick={() => onTempoChange(222)} />
        }}
      />
    )
    wrapper.find('button').simulate('click')
    expect(tempoProp).toBe(222)
  })

  test('`onPlay` prop updates `playing` state to `true` when stopped', () => {
    let playingProp
    const wrapper = mount(
      <Metronome
        render={({ onPlay, playing }) => {
          playingProp = playing
          return <button onClick={onPlay} />
        }}
      />
    )
    wrapper.find('button').simulate('click')
    expect(playingProp).toBe(true)
  })

  test('`onPlay` prop updates `playing` state to `false` when started', () => {
    let playingProp
    const wrapper = mount(
      <Metronome
        autoplay={true}
        render={({ onPlay, playing }) => {
          playingProp = playing
          return <button onClick={onPlay} />
        }}
      />
    )
    wrapper.find('button').simulate('click')
    expect(playingProp).toBe(false)
  })
})

describe('<Metronome autoplay />', () => {
  test('sets `playing` state to true', () => {
    let playingProp
    const renderSpy = jest.fn(({ playing }) => {
      playingProp = playing
      return null
    })
    mount(<Metronome autoplay={true} render={renderSpy} />)
    expect(playingProp).toBe(true)
  })
})

describe('<Metronome tempo />', () => {
  test('updates `tempo` state', () => {
    let tempoProp
    const renderSpy = jest.fn(({ tempo }) => {
      tempoProp = tempo
      return null
    })
    mount(<Metronome tempo={222} render={renderSpy} />)
    expect(tempoProp).toBe(222)
  })
})

describe('<Metronome beatsPerMeasure />', () => {
  test('updates `beatsPerMeasure` state', () => {
    let beatsPerMeasureProp
    const renderSpy = jest.fn(({ beatsPerMeasure }) => {
      beatsPerMeasureProp = beatsPerMeasure
      return null
    })
    mount(<Metronome beatsPerMeasure={5} render={renderSpy} />)
    expect(beatsPerMeasureProp).toBe(5)
  })
})

describe('<Metronome subdivision />', () => {
  test('throws if invalid', () => {
    expect(() => {
      mount(<Metronome subdivision={0} />)
    }).toThrow()
    expect(() => {
      mount(<Metronome subdivision={5} />)
    }).toThrow()
  })

  test('updates `subdivision` state', () => {
    let subdivisionProp
    const renderSpy = jest.fn(({ subdivision }) => {
      subdivisionProp = subdivision
      return null
    })
    mount(<Metronome subdivision={3} render={renderSpy} />)
    expect(subdivisionProp).toBe(3)
  })
})

describe('<Metronome onStart />', () => {
  test('is called when the metronome starts', () => {
    const onStartSpy = jest.fn()
    mount(<Metronome autoplay={true} onStart={onStartSpy} />)
    expect(onStartSpy).toHaveBeenCalledTimes(1)
  })
})

describe.skip('<Metronome onTick />', () => {
  test('is called the right number of times')
})

describe('<Metronome onSubtick />', () => {
  test('is called the right number of times')
})
