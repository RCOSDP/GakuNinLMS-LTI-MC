import type { Story } from "@storybook/react";
import Problem from "./Problem";
import Link from "@mui/material/Link";

export default {
  title: "organisms/Problem",
  component: Problem,
};

const Template: Story<Parameters<typeof Problem>[0]> = (args) => (
  <Problem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "ブックが存在していません",
  children: (
    <>
      担当教員にお問い合わせください。
      <p>
        <Link href="#">LMSに戻る</Link>
      </p>
    </>
  ),
};
