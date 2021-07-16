export default { title: "atoms/DescriptionList" };

import DescriptionList from "./DescriptionList";

const value = [...Array(10)].fill({ key: "key", value: "value" });

export const Default = () => <DescriptionList value={value} />;

export const Inline = () => <DescriptionList inline value={value} />;

export const Nowrap = () => <DescriptionList nowrap value={value} />;
