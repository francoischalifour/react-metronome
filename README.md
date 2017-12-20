# react-metronome

> React primitives for building metronomes on the web.

React component exposing the metronome's state via a
[`render` prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) to
compute the UI. It uses a
[Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
to not block the main JavaScript execution thread, assuring to stay in sync for
a long time.

No more "[Not quite my tempo](https://www.youtube.com/watch?v=xDAsABdkWSc)" 🥁.

_Based on [Chris Wilson](https://twitter.com/cwilso)'s work:
["Scheduling Web Audio with Precision"](https://www.html5rocks.com/en/tutorials/audio/scheduling/)._

## Installation

```sh
# not published yet
```

> This package depends on [`react`](https://github.com/facebook/react). Make
> sure to install it as well.

## Usage

```js
const MusicApp = () => (
  <Metronome
    tempo={69}
    render={({
      tempo,
      beatsPerMeasure,
      playing,
      beat,
      subdivision,
      onPlay,
      onBpmChange,
    }) => (
      <div>
        <header>
          {tempo} <small>BPM</small>
          {beatsPerMeasure}/{beatsPerMeasure} <small>T.S.</small>
        </header>

        <main>
          <input
            type="range"
            min={40}
            max={240}
            value={tempo}
            onChange={event => onBpmChange(event.target.value)}
          />
          {beat}/{beatsPerMeasure}
          <button onClick={onPlay}>{playing ? 'Pause' : 'Play'}</button>
        </main>
      </div>
    )}
  />
)
```

The component uses a
[`render` prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)
and ignores children.

## Props

### tempo

> `number` | defaults to `120`

The tempo or BPM
([beats per minute](https://en.wikipedia.org/wiki/Tempo#Beats_per_minute)) of
the metronome.

### beatsPerMeasure

> `number` | defaults to `4`

The number of ticks per measure. A value of `5` means a
[time signature](https://en.wikipedia.org/wiki/Time_signature) of 5/4.

### subdivision

> `number` | defaults to `1`

The number of ticks per beat. Possible values are:

| Value | Description     |                                                                                                                                             |
| ----- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `1`   | Half notes      | <img src="https://user-images.githubusercontent.com/6137112/33534626-a8edf734-d876-11e7-841a-cd9a7b339303.png" alt="Half" height="24">      |
| `2`   | Eighth notes    | <img src="https://user-images.githubusercontent.com/6137112/33534624-a8bb266a-d876-11e7-9195-2e0a7cce1cff.png" alt="Eighth" height="24">    |
| `3`   | Triplet notes   | <img src="https://user-images.githubusercontent.com/6137112/33534625-a8d52baa-d876-11e7-9a15-745682939888.png" alt="Triplet" height="24">   |
| `4`   | Sixteenth notes | <img src="https://user-images.githubusercontent.com/6137112/33534627-a91dd5da-d876-11e7-8916-2bee2ce368d8.png" alt="Sixteenth" height="24"> |

### autoplay

> `boolean` | defaults to `false`

`true` if the metronome should start on mount, `false` otherwise.

### beatFrequency

> `number` | defaults to `880`

The
[frequency](https://developer.mozilla.org/fr/docs/Web/API/OscillatorNode/frequency)
in hertz of the main beat.

### beatVolume

> `number` | defaults to `1`

The volume (or
[gain](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createGain))
of the main beat. Between `0` and `1`.

### subdivisionFrequency

> `number` | defaults to `440`

The
[frequency](https://developer.mozilla.org/fr/docs/Web/API/OscillatorNode/frequency)
in hertz of the subdivision beats.

### subdivisionVolume

> `number` | defaults to `0.5`

The volume (or
[gain](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createGain))
of the subdivision beats. Between `0` and `1`.

### render

> `function` | no default

The function to describe the UI of the metronome based on its state. The state
object composed of:

| Property          | Type                      | Description                                            |
| ----------------- | ------------------------- | ------------------------------------------------------ |
| `tempo`           | `number`                  | The tempo (beats per minute) of the metronome          |
| `beatsPerMeasure` | `number`                  | The number of beats per measure                        |
| `playing`         | `boolean`                 | `true` if the metronome has started, `false` otherwise |
| `beat`            | `number`                  | The current beat count                                 |
| `subdivision`     | `number`                  | The subdivision of a beat                              |
| `onBpmChange`     | `function(tempo: number)` | The function to call to change the `tempo`             |
| `onPlay`          | `function()`              | The function to call to toggle the `playing` value     |

### onTick

> `function` | no default

Called when a beat increments.

### onSubtick

> `function` | no default

Called when a subdivision tick increments.

### onStart

> `function` | no default

Called when the metronome starts.

### onStop

> `function` | no default

Called when the metronome stops.

## Development

* From the root folder:
  * Watch changes: `yarn start`
* From the `demo/` folder:
  * Run app: `yarn start`

Every time you make changes to the library, the browser injects the new code into the app.

## License

MIT © [François Chalifour](https://francoischalifour.com)
