import type { Meta, StoryObj } from "@storybook/react";

import { WeatherCard } from "./WeatherCard";

const meta = {
  title: "Component/Weather Card",
  component: WeatherCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WeatherCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    location: {
      id: 5405380,
      locationName: "Vallejo",
      latitude: 38.10409,
      longitude: -122.25664,
      timezone: "America/Los_Angeles",
      country: "United States",
      locationRegion1: "California",
      locationRegion2: "Solano",
      isExpanded: false,
    },
    prefersFahrenheit: false,
  },
};

export const Fahrenheit: Story = {
  args: {
    location: {
      id: 5405380,
      locationName: "Vallejo",
      latitude: 38.10409,
      longitude: -122.25664,
      timezone: "America/Los_Angeles",
      country: "United States",
      locationRegion1: "California",
      locationRegion2: "Solano",
      isExpanded: false,
    },
    prefersFahrenheit: true,
  },
};

export const Expanded: Story = {
  args: {
    location: {
      id: 5405380,
      locationName: "Vallejo",
      latitude: 38.10409,
      longitude: -122.25664,
      timezone: "America/Los_Angeles",
      country: "United States",
      locationRegion1: "California",
      locationRegion2: "Solano",
      isExpanded: true,
    },
    prefersFahrenheit: false,
  },
};
