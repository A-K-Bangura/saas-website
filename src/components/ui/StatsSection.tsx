// import { Container } from "@/components/ui/container"
// import { Section } from "@/components/ui/section"
// import { TypographyH2 } from "@/components/ui/typography"

import { Container } from "./Container";
import { Section } from "./Section";
import { TypographyH2 } from "./Typography";

interface Stat {
  number: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  title?: string;
  stats: Stat[];
  className?: string;
}

export function StatsSection({
  title = "",
  stats,
  className = "",
}: StatsSectionProps) {
  return (
    <Section className={`bg-muted/30 ${className} mt-0`}>
      <Container>
        {title && (
          <div className="text-center mb-16">
            <TypographyH2>{title}</TypographyH2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
