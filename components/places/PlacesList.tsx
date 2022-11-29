import { Card } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { usePlaces } from "../../hooks/places";

const PlacesList: FC = () => {
  const { data: places } = usePlaces();
  const router = useRouter();

  return (
    <div className="grid-cols-4 grid gap-4 p-5">
      {places?.map((place) => (
        <Card
          isHoverable
          isPressable
          onPress={() => router.push("/places/" + place.id)}
          key={place.id}
          className="h-34"
        >
          {place.description}
        </Card>
      ))}
    </div>
  );
};

export default PlacesList;
