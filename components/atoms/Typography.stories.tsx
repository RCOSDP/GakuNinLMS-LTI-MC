export default { title: "atoms/Typography" };

import Typography from "@material-ui/core/Typography";

export const Default = () => (
  <div>
    <Typography variant="h1">h1</Typography>
    <Typography variant="h2">h2</Typography>
    <Typography variant="h3">h3</Typography>
    <Typography variant="h4">h4</Typography>
    <Typography variant="h5">h5</Typography>
    <Typography variant="h6">h6</Typography>
    <Typography variant="subtitle1">subtitle1</Typography>
    <Typography variant="subtitle2">subtitle2</Typography>
    <Typography variant="body1">body1</Typography>
    <Typography variant="body2">body2</Typography>
  </div>
);

export const Book = () => (
  <div>
    <Typography variant="h4" gutterBottom={true}>
      ブック「コンピュータ・サイエンス」の編集
    </Typography>
    <Typography variant="h5" gutterBottom={true}>
      トピック順の編集
    </Typography>
  </div>
);

export const Topic = () => (
  <div>
    <Typography variant="subtitle1">
      ブック「コンピュータ・サイエンス」内
    </Typography>
    <Typography variant="h4" gutterBottom={true}>
      トピック「リンゴに夢中のレッサーパンダ」の編集
    </Typography>
  </div>
);
