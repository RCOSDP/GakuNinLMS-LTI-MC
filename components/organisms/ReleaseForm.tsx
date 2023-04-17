import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Card from "$atoms/Card";
import TextField from "$atoms/TextField";
import type { ReleaseProps } from "$server/models/book/release";

export type ReleaseFormProps = {
  release: ReleaseProps;
  onSubmit(release: ReleaseProps): void;
};

export default function ReleaseForm({ release, onSubmit }: ReleaseFormProps) {
  const { register, handleSubmit } = useForm<ReleaseProps>({ values: release });

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        inputProps={register("version")}
        required
        label="バージョン"
        fullWidth
      />
      <TextField inputProps={register("comment")} label="コメント" fullWidth />
      <Divider sx={{ mx: "-50%" }} />
      <div className="release-form-row">
        <Button variant="contained" color="primary" type="submit">
          {release.version ? "更新" : "作成"}
        </Button>
      </div>
    </Card>
  );
}
