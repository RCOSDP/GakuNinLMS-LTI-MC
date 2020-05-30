import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import TheatersIcon from "@material-ui/icons/Theaters";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { PopupState, bindMenu } from "material-ui-popup-state/hooks";
import { useRouter } from "./router";
import Divider from "@material-ui/core/Divider";
import { UrlObject } from "url";

type Item = {
  title: string;
  icon?: JSX.Element;
  href: string | UrlObject;
};

const menuItems: (Item | string)[] = [
  {
    title: "学習コンテンツ管理",
    icon: <LibraryBooksIcon />,
    href: "/contents",
  },
  {
    title: "ビデオ管理",
    icon: <TheatersIcon />,
    href: "/videos",
  },
  "divider",
  {
    title: "学習コンテンツを作成する",
    href: {
      pathname: "/contents",
      query: {
        action: "new",
      },
    },
  },
  {
    title: "ビデオを追加する",
    href: {
      pathname: "/videos",
      query: {
        action: "new",
      },
    },
  },
  {
    title: "学習管理システム連携",
    href: "/edit",
  },
];

export function TopAppMenu(props: { popupState: PopupState }) {
  const router = useRouter();

  return (
    <Menu {...bindMenu(props.popupState)}>
      {menuItems.map((item, i) => {
        if (typeof item === "string") return <Divider key={i} />;
        return (
          <MenuItem
            key={i}
            onClick={() => {
              props.popupState.close();
              router.push(item.href);
            }}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <Typography variant="inherit">{item.title}</Typography>
          </MenuItem>
        );
      })}
    </Menu>
  );
}
