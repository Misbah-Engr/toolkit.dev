import { HStack } from "@/components/ui/stack";
import { Section } from "../lib/section";
import { SECTIONS } from "../sections";
import { SiGithub } from "@icons-pack/react-simple-icons";

export const RoadmapSection = () => {
  return (
    <Section id={SECTIONS.Roadmap} className="p-0 md:p-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <RoadmapItem
          title="Q1 2025"
          description="We launched the Toolkit platform and started building the Toolkit ecosystem."
          items={[
            "We launched the Toolkit platform and started building the Toolkit ecosystem.",
          ]}
          Icon={SiGithub}
        />
        <RoadmapItem
          title="Q2 2025"
          description="We launched the Toolkit platform and started building the Toolkit ecosystem."
          items={[
            "We launched the Toolkit platform and started building the Toolkit ecosystem.",
          ]}
          Icon={SiGithub}
        />
        <RoadmapItem
          title="Q3 2025"
          description="We launched the Toolkit platform and started building the Toolkit ecosystem."
          items={[
            "We launched the Toolkit platform and started building the Toolkit ecosystem.",
          ]}
          Icon={SiGithub}
        />
      </div>
    </Section>
  );
};

interface RoadmapItemProps {
  title: string;
  description: string;
  items: string[];
  Icon: React.FC<{ className?: string }>;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({
  title,
  description,
  items,
  Icon,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <HStack>
        <Icon className="size-4" />
        <h2>{title}</h2>
      </HStack>
      <p>{description}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
