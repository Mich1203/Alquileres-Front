import { Button, Col, Container, Row, Spacer, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { FaBed, FaRulerCombined, FaToilet, FaUsers } from "react-icons/fa";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useSinglePlace } from "../../../hooks/places";
import numeral from "numeral";
import AppWrapper from "../../../components/common/AppWrapper";

const PlacePage = () => {
  const router = useRouter();
  const { data: place } = useSinglePlace(+(router.query.id ?? 0));

  const galleryItems = useMemo(
    (): ReactImageGalleryItem[] =>
      place?.images?.map((img) => ({
        original: img,
        thumbnail: img,
        originalHeight: 300,
        originalWidth: 300,
      })) ?? [],
    [place],
  );

  return (
    <AppWrapper>
      <Container>
        <Row className="mb-5">
          <Col>
            <ReactImageGallery items={galleryItems} showPlayButton={false} />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Container className="font-bold">
              <Row>
                <Col>
                  <text># de baños</text>
                  <br />
                  <FaToilet className="mr-2" /> {place?.no_of_bathrooms}
                </Col>
                <Col>
                  <text># de habitaciones</text>
                  <br />
                  <FaBed className="mr-2" /> {place?.no_of_rooms}
                </Col>
              </Row>
              <Spacer y={1} />
              <Row>
                <Col>
                  <text>Capacidad</text>
                  <br />
                  <FaUsers className="mr-2" /> {place?.capacity}
                </Col>
                <Col>
                  <text>Medidas</text>
                  <br />
                  <FaRulerCombined className="mr-2" /> {place?.measurements}
                  {place?.measure_units}
                </Col>
              </Row>
              <Spacer y={1} />
              <Row>
                <Col>
                  <text>Dirección</text>
                  <br />
                  {place?.address}
                </Col>
              </Row>
              <Spacer y={1} />
              <Row>
                <Col>
                  <text>Description</text>
                  <br />
                  {place?.description}
                </Col>
              </Row>
            </Container>
          </Col>
          <Col span={4}>
            <Container className="p-0">
              <Row>
                <h3>{numeral(place?.price).format("0,0.00")} $ / mes</h3>
              </Row>
              <Spacer y={1} />
              <Row className="flex flex-col items-center">
                <Button
                  css={{ bgColor: "$popper", width: "100%" }}
                  onPress={() => router.push(`/places/${place?.id}/checkout`)}
                  disabled={place?.is_rented}
                >
                  Alquilar
                </Button>
                {place?.is_rented && (
                  <Text color="error">
                    Esta vivienda ya se encuentra alquilada
                  </Text>
                )}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </AppWrapper>
  );
};

export default PlacePage;
