import { useEffect, useMemo, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Container } from "@/components/ui/container";
// import { Section } from "@/components/ui/section";
// import {
//   TypographyH2,
//   TypographyH3,
//   TypographyP,
// } from "@/components/ui/typography";
import { FiArrowRight } from "react-icons/fi";
// import { useGsapScrollTrigger } from "@/src/hooks/use-gsap-scroll-trigger";
import { Section } from "../../ui/Section";
import { Container } from "../../ui/Container";
import { TypographyH2, TypographyP } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import port1 from "../../../assets/portfoliohome/port1.jpg";
import port2 from "../../../assets/portfoliohome/port2.jpg";
import port3 from "../../../assets/portfoliohome/port3.jpg";
import port4 from "../../../assets/portfoliohome/port4.jpg";
import port5 from "../../../assets/portfoliohome/port5.jpg";
import port6 from "../../../assets/portfoliohome/port6.jpg";
// import { Card, CardContent } from "../../ui/Card";
// import { Badge } from "../../ui/Badge";

const portfolioImages = [port1, port2, port3, port4, port5, port6];

const tileLayout = [
  "col-span-7 row-span-3 md:col-span-4 md:row-span-3",
  "col-span-5 row-span-2 md:col-span-5 md:row-span-2",
  "col-span-12 row-span-2 md:col-span-5 md:row-span-2",
  "col-span-6 row-span-2 md:col-span-3 md:row-span-5",
  "col-span-6 row-span-3 md:col-span-4 md:row-span-2",
  "col-span-12 row-span-2 md:col-span-5 md:row-span-3",
  "col-span-8 row-span-2 md:col-span-4 md:row-span-2",
  "col-span-4 row-span-2 md:col-span-3 md:row-span-2",
];

type TileTransition = {
  image: string;
  visible: boolean;
};

function pickRandomImage(exclude?: string) {
  const candidates = portfolioImages.filter((image) => image !== exclude);
  const sourcePool = candidates.length ? candidates : portfolioImages;
  return sourcePool[Math.floor(Math.random() * sourcePool.length)];
}

export function Portfolio() {
  const navigate = useNavigate();
  const initialTiles = useMemo(
    () => tileLayout.map(() => pickRandomImage()),
    [],
  );
  const [tileImages, setTileImages] = useState<string[]>(initialTiles);
  const [tileTransitions, setTileTransitions] = useState<
    Array<TileTransition | null>
  >(tileLayout.map(() => null));

  useEffect(() => {
    const fadeDurationMs = 1200;

    const triggerTileTransition = (tileIndex: number, delayMs = 0) => {
      window.setTimeout(() => {
        setTileImages((currentImages) => {
          const nextImage = pickRandomImage(currentImages[tileIndex]);

          setTileTransitions((prevTransitions) => {
            const nextTransitions = [...prevTransitions];
            nextTransitions[tileIndex] = { image: nextImage, visible: false };
            return nextTransitions;
          });

          window.requestAnimationFrame(() => {
            setTileTransitions((prevTransitions) => {
              const nextTransitions = [...prevTransitions];
              const currentTransition = nextTransitions[tileIndex];
              if (!currentTransition) return prevTransitions;
              nextTransitions[tileIndex] = {
                ...currentTransition,
                visible: true,
              };
              return nextTransitions;
            });
          });

          window.setTimeout(() => {
            setTileImages((prevImages) => {
              const nextImages = [...prevImages];
              nextImages[tileIndex] = nextImage;
              return nextImages;
            });

            setTileTransitions((prevTransitions) => {
              const nextTransitions = [...prevTransitions];
              nextTransitions[tileIndex] = null;
              return nextTransitions;
            });
          }, fadeDurationMs);

          return currentImages;
        });
      }, delayMs);
    };

    const intervalId = window.setInterval(() => {
      const firstTileIndex = Math.floor(Math.random() * tileLayout.length);
      const secondTileIndex = (firstTileIndex + 3) % tileLayout.length;

      triggerTileTransition(firstTileIndex, 0);
      triggerTileTransition(secondTileIndex, 220);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <Section className="relative overflow-hidden min-h-[72vh] md:min-h-[78vh]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/68 backdrop-blur-[1.5px]" />
        <div className="grid h-full grid-cols-12 grid-rows-12 md:grid-rows-8 grid-flow-dense gap-1 md:gap-1.5 p-1.5 md:p-2 opacity-50">
          {tileLayout.map((layoutClassName, index) => (
            <div
              key={`${layoutClassName}-${index}`}
              className={`relative rounded-xl overflow-hidden shadow-md ${layoutClassName}`}
            >
              <img
                src={tileImages[index]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              {tileTransitions[index] && (
                <img
                  src={tileTransitions[index].image}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                    tileTransitions[index].visible ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Container className="relative z-10">
        <div className="text-center py-8 md:py-14">
          <TypographyH2 className="mb-4">Our Portfolios</TypographyH2>
          <TypographyP className="text-lg text-black max-w-2xl mx-auto mb-4">
            {/* Explore our completed projects showcasing sustainable and innovative
            architectural solutions across Sierra Leone. */}
            <span className="font-semibold">
              Work from top Architectures and Constructors nationwide available
              at your disposal.
            </span>
          </TypographyP>

          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            onClick={() => navigate("/projects")}
          >
            View Projects
            <FiArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
