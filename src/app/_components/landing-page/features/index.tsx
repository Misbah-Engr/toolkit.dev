import React from "react";

import { Section } from "../section";
import {
  FeatureCard,
  FeatureCardDescription,
  FeatureCardTitle,
  FeatureCardFooter,
  FeatureCardComponent,
} from "./feature-card";

import { AnyModel } from "./features/any-model";
import { cn } from "@/lib/utils";
import { GetPaid } from "./features/get-paid";
import { ToggleTools } from "./features/toggle-tools";

export const FeaturesSection: React.FC = () => {
  return (
    <Section id="features" className="p-0 md:p-0">
      <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4")}>
        {/* Get Paid */}
        <FeatureCard>
          <FeatureCardComponent>
            <GetPaid />
          </FeatureCardComponent>
          <FeatureCardFooter>
            <FeatureCardTitle>Get Paid</FeatureCardTitle>
            <FeatureCardDescription>
              Get paid for your work
            </FeatureCardDescription>
          </FeatureCardFooter>
        </FeatureCard>
        {/* Toggle Tools */}
        <FeatureCard>
          <FeatureCardComponent>
            <ToggleTools />
          </FeatureCardComponent>
          <FeatureCardFooter>
            <FeatureCardTitle>Toggle Tools</FeatureCardTitle>
            <FeatureCardDescription>
              Toggle tools for your work
            </FeatureCardDescription>
          </FeatureCardFooter>
        </FeatureCard>
        {/* Generative UI */}
        <FeatureCard>
          <FeatureCardComponent>{null}</FeatureCardComponent>
          <FeatureCardFooter>
            <FeatureCardTitle>Generative UI</FeatureCardTitle>
            <FeatureCardDescription>
              Generative UI for your work
            </FeatureCardDescription>
          </FeatureCardFooter>
        </FeatureCard>
        {/* Any Model */}
        <FeatureCard>
          <FeatureCardComponent>
            <AnyModel />
          </FeatureCardComponent>
          <FeatureCardFooter>
            <FeatureCardTitle>Any Model</FeatureCardTitle>
            <FeatureCardDescription>
              Use any model you want
            </FeatureCardDescription>
          </FeatureCardFooter>
        </FeatureCard>
      </div>
    </Section>
  );
};
