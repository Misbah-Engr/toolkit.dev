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

export const FeaturesSection: React.FC = () => {
  return (
    <Section id="features" className="p-0 md:p-0">
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
          "[&>]:border-r [&>*]:border-b",
          "md:[&>*:nth-child(-n+2)]:border-b-0 md:[&>*:nth-child(even)]:border-r-0",
          "xl:border-b-0 xl:last:border-r-0 xl:[&>*:nth-child(-n+2)]:border-b-0",
        )}
      >
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
      </div>
    </Section>
  );
};
