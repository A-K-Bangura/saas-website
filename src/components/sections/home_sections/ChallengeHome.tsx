import { Section } from "../../ui/Section";
import { Container } from "../../ui/Container";
import { TypographyH2, TypographyH3, TypographyP } from "../../ui/Typography";
import { useGsapScrollTrigger } from "@/src/hooks/use-gsap-scroll-trigger";

const challenges = [
  {
    title: "Fragmented Talent",
    description:
      "Finding reliable, qualified professionals for design, engineering and site work is difficult and risky.",
  },
  {
    title: "Material Uncertainty",
    description:
      "Substandard cement, steel and blocks remain common. Clients often overpay or receive weak materials.",
  },
  {
    title: "Untrained Workforce",
    description:
      "Many site teams lack formal technical training, leading to poor workmanship and safety risks.",
  },
  {
    title: "Complex Process",
    description:
      "Land, surveys, drawings, permits and documentation create delays and confusion for owners.",
  },
];

export function Challenge() {
  const challengeRef = useGsapScrollTrigger({ y: 40, stagger: 0.15 });

  return (
    <Section>
      <Container>
        <div className="text-center mb-8 md:mb-10">
          <TypographyH2 className="mb-4">The Challange in Salone Construction
</TypographyH2>
          <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The challenges in Salone construction, and why one integrated
            partner matters.
          </TypographyP>
        </div>

        <div
          ref={challengeRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 gsap-scroll-trigger"
        >
          {challenges.map((item) => (
            <div key={item.title} className="space-y-2">
              <TypographyH3 className="text-xl">{item.title}</TypographyH3>
              <TypographyP className="text-muted-foreground leading-relaxed">
                {item.description}
              </TypographyP>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
