// components/HoverCard.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const HoverCard: React.FC = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="slide slide1">
          <div className="content">
            <div className="icon  flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-white w-24 h-24 "
              />
            </div>
          </div>
        </div>

        <div className="slide slide2">
          <div className="content font-updock">
            <h3>Hello there!</h3>

            <p>Trust yourself and keep going.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
