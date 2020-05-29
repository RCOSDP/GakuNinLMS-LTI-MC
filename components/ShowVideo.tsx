export type ShowVideoProps = { id: string };

export function ShowVideo(props: ShowVideoProps) {
  const title = `ビデオ: ${props.id}`;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
