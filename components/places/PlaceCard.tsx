import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { IPlace } from "../../interfaces/places.interface";

type TProps = {
  place: IPlace;
};

const PlaceCard: FC<TProps> = ({ place }) => {
  const router = useRouter();

  const handleGoPlace = () => {
    router.push("/places/" + place.id);
  };

  return (
    <Card css={{ w: "100%", h: "400px" }} isPressable onPress={handleGoPlace}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          {/* <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
            Your day your way
          </Text> */}
          {/* <Text h3 color="white">
            Your checklist for better sleep
          </Text> */}
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        {place?.images && place.images[0] && (
          <Card.Image
            src={place.images[0]}
            objectFit="cover"
            width="100%"
            height="100%"
            alt="Relaxing app background"
          />
        )}
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#0f111466",
          borderTop: "$borderWeights$light solid $gray800",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Row>
              <Col span={3}>
                {/* <Card.Image
                  src={place.images[0]}
                  css={{ bg: "black", br: "50%" }}
                  height={40}
                  width={40}
                  alt="Breathing app icon"
                /> */}
              </Col>
              <Col>
                <Text color="#d1d1d1" size={12}>
                  Breathing App
                </Text>
                <Text color="#d1d1d1" size={12}>
                  Get a good nights sleep.
                </Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button
                flat
                auto
                rounded
                css={{ color: "#94f9f0", bg: "#94f9f026" }}
                onClick={handleGoPlace}
              >
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  Ver vivienda
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default PlaceCard;
