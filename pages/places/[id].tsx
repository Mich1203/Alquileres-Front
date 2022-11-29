import { useRouter } from "next/router";
import React from "react";
import { useSinglePlace } from "../../hooks/places";

const PlacePage = () => {
  const router = useRouter();
  const { data: place } = useSinglePlace(+(router.query.id ?? 0));

  console.log(place);

  return <div>PlacePage</div>;
};

export default PlacePage;
