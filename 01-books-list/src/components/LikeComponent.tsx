import { LikeIcon } from "../assets/icons";

interface Props {
    isChecked: boolean
    onClickFunction: () => void
  }
  
  export function LikeComponent({ isChecked, onClickFunction }: Props) {
    return (
      <div className="heart-container" title="Like">
        <input 
          type="checkbox" 
          onChange={onClickFunction} 
          checked={isChecked}
          data-testid="like-checkbox" 
          className="checkbox" 
          id="Give-It-An-Id" 
        />
        <LikeIcon />
      </div>
    );
  }
  