import type { Story } from "@storybook/react";
import Accordion from "./Accordion";

export default {
  title: "organisms/Accordion",
  component: Accordion,
};

const Template: Story<Parameters<typeof Accordion>[0]> = (args) => (
  <Accordion {...args} />
);

export const Default = Template.bind({});
Default.args = {
  summary: "詳細",
  details: `吾輩は猫である。名前はまだない。
どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。`,
};
