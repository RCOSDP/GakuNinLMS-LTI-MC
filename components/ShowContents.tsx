export type ShowContentProps = { id: string };

export function ShowContent(props: ShowContentProps) {
  const title = `学習コンテンツ: ${props.id}`;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
