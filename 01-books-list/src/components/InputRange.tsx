import { useEffect } from "react";
import { useInputStore } from "../store/useInputStore";
import { useBooksStore } from "../store/useBooksStore";

export function InputRange() {

  const { inputRangeStore, setInputRangeStore } = useInputStore((state) => ({
    inputRangeStore    : state.inputRangeStore,
    setInputRangeStore : state.setInputRangeStore
  }))

  const { setFilterBooksByNumberPages } = useBooksStore((state) => 
    ({
        setFilterBooksByNumberPages: state.setFilterBooksByNumberPages,
   }));

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setInputRangeStore(newValue);
  };

  useEffect(() => {
    
    setFilterBooksByNumberPages(inputRangeStore)

  }, [inputRangeStore])
  

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
