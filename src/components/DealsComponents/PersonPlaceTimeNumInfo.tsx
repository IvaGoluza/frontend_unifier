import React from "react";

import { faClock, faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PlaceTimeNumInfoProps {
  person?: string;
  location: string;
  time: string;
  volunteerNumber?: number;
  textColor: string;
}

const PersonPlaceTimeNumInfo: React.FC<PlaceTimeNumInfoProps> = ({
  person,
  location,
  time,
  volunteerNumber,
  textColor,
}) => {
  const additionalCSS = {
    color: `#${textColor}`,
  };

  return (
    <section className={"my-10 grid w-fit grid-cols-12"} style={additionalCSS}>
      {person && <FontAwesomeIcon icon={faUser} className="col-span-1 self-center justify-self-center" />}
      {person && <p className="col-span-11 ml-1 font-semibold">{person}</p>}
      <FontAwesomeIcon icon={faLocationDot} className="col-span-1 self-center justify-self-center" />
      <p className="col-span-11 ml-1 font-semibold">{location}</p>
      <FontAwesomeIcon icon={faClock} className="col-span-1 self-center justify-self-center" />
      <p className="col-span-11 ml-1 font-semibold">{time}</p>
      {volunteerNumber && <FontAwesomeIcon icon={faUser} className="col-span-1 self-center justify-self-center" />}
      {volunteerNumber && <p className="col-span-11 ml-1 font-semibold">Broj potrebnih volontera: {volunteerNumber}</p>}
    </section>
  );
};

export default PersonPlaceTimeNumInfo;
