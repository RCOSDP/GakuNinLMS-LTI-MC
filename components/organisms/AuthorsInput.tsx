import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "$atoms/IconButton";
import Input from "$atoms/Input";
import InputLabel from "$atoms/InputLabel";
import Select from "$atoms/Select";
import { AuthorSchema } from "$server/models/author";
import type { AuthorProps } from "$server/models/author";
import { update, remove } from "$utils/reorder";
import { useSessionAtom } from "$store/session";

const AuthorItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& > :not(:last-child)": {
    marginRight: theme.spacing(2),
  },
  marginBottom: theme.spacing(1.5),
}));

const AuthorName = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  ".name": {
    lineHeight: 1,
  },
  ".email": {
    color: grey[700],
    fontSize: theme.typography.caption.fontSize,
  },
  ".lti-consumer-id": {
    color: grey[700],
    fontSize: theme.typography.caption.fontSize,
  },
}));

type Props = {
  id?: string;
  authors: AuthorSchema[];
  onAuthorsUpdate?(authors: AuthorSchema[]): void;
  onAuthorSubmit?(author: AuthorProps): void;
};

export default function AuthorsInput({
  id,
  authors,
  onAuthorsUpdate,
  onAuthorSubmit = () => undefined,
}: Props) {
  const [email, setEmail] = useState("");
  const { session } = useSessionAtom();
  const handleAuthorUpdate =
    (author: AuthorSchema) => (event: SelectChangeEvent<unknown>) => {
      const index = authors.findIndex(({ id }) => id === author.id);
      onAuthorsUpdate?.(
        update(authors, index, {
          ...author,
          roleName: event.target
            .value as typeof AuthorSchema._roleNames[keyof typeof AuthorSchema._roleNames],
        })
      );
    };
  const handleAuthorRemove = (author: AuthorSchema) => () => {
    const index = authors.findIndex(({ id }) => id === author.id);
    onAuthorsUpdate?.(remove(authors, index));
  };
  const handleClear = () => setEmail("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handleAuthorSubmit = () => onAuthorSubmit({ email });

  return (
    <div>
      <InputLabel htmlFor={id} sx={{ mb: 1 }}>
        著者
      </InputLabel>
      {authors.map((author) => (
        <AuthorItem key={author.id}>
          <AuthorName>
            <span className="name">{author.name}</span>
            <span className="email">{author.email}</span>
            <span className="lti-consumer-id">
              {author.ltiConsumerId} に存在するユーザー
            </span>
          </AuthorName>
          <Select onChange={handleAuthorUpdate(author)} value={author.roleName}>
            {Object.values(AuthorSchema._roleNames).map((roleName) => (
              <MenuItem key={roleName} value={roleName}>
                {roleName}
              </MenuItem>
            ))}
          </Select>
          <IconButton
            onClick={handleAuthorRemove(author)}
            color="warning"
            tooltipProps={{ title: "このユーザーを取り除く" }}
            disabled={session?.user?.email === author.email}
          >
            <PersonRemoveIcon />
          </IconButton>
        </AuthorItem>
      ))}
      <Input
        id={id}
        type="email"
        placeholder="user@example.com"
        value={email}
        onChange={handleChange}
        startAdornment={<EmailOutlinedIcon />}
        endAdornment={
          <>
            <IconButton
              onClick={handleClear}
              color="secondary"
              tooltipProps={{ title: "入力をクリア" }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              onClick={handleAuthorSubmit}
              color="primary"
              tooltipProps={{ title: "このメールアドレスのユーザーを追加" }}
            >
              <PersonAddIcon />
            </IconButton>
          </>
        }
      />
    </div>
  );
}
