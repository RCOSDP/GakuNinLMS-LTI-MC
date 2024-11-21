import useActivityTimeRangeCountByTopic from "$utils/useActivityTimeRangeCountByTopic";

type Props = {
  topicId: number;
};

export default function ActivityRewatchGraph(props: Props) {
  const { topicId } = props;
  const { data: counts } = useActivityTimeRangeCountByTopic(topicId);

  return (
    <>
      以下のデータでグラフをつくる
      <p>activityId, startMs, endMs, count</p>
      {counts?.map((count, index) => (
        <p key={index}>
          <span>{count?.activityId}</span>,<span>{count?.startMs}</span>,
          <span>{count?.endMs}</span>,<span>{count?.count}</span>
        </p>
      ))}
    </>
  );
}
