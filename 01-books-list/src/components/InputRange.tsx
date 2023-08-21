import { useInputState } from "../hooks";

export function InputRange() {

  const { inputRangeStore, handleSliderChange } = useInputState()

  return (
    <div className="PB-range-slider-div">
      <input
        type="range"
        min="0"
        max="1200"
        value={inputRangeStore}
        className="PB-range-slider"
        id="myRange"
        onChange={handleSliderChange}
      />
      <p className="PB-range-slidervalue">{`${inputRangeStore} pages`}</p>
    </div>
  );
}
