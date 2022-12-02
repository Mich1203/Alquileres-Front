import { useRouter } from "next/router";
import React, { FC } from "react";
import { usePlaces } from "../../hooks/places";
import PlaceCard from "./PlaceCard";

const PlacesList: FC = () => {
  const { data: places } = usePlaces();
  const router = useRouter();

  return (
    <div className="grid-cols-4 grid gap-4 p-5">
      {places?.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
};

export default PlacesList;
