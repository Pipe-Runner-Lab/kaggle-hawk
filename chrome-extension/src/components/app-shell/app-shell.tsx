import React, { useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../app-bar";
import Spacer from "../spacer";
import { Menu, MenuItem } from "@material-ui/core";
import { render } from "react-dom";
import DataContext from "../../contexts/data-context";
import { SortKeys } from "../../types/sort";
import { sortMenuData } from "./data/menu-data";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
    height: "580px",
    display: "flex",
    flexDirection: "column",
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  iconGroup: {
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
  },
  contentContainer: {
    backgroundColor: "#121212",
    flex: 1,
    overflow: "hidden",
  },
}));

type AppShellProps = {
  children: any;
};

export default function AppShell({ children }: AppShellProps) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = useState("sort");
  const { updateSortKey } = useContext(DataContext);

  function renderMenu(type: string) {
    switch (type) {
      case "sort":
        return (
          <Menu
            id="app-bar-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onCloseMenu}
          >
            {sortMenuData.map((item, idx) => (
              <MenuItem
                key={idx}
                dense={true}
                onClick={() => {
                  updateSortKey(item.value);
                  onCloseMenu();
                }}
              >
                {item.key}
              </MenuItem>
            ))}
          </Menu>
        );
      default:
        return null;
    }
  }

  const onOpenMenu = (type: string) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setMenuType(type);
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <div onClick={() => history.goBack()} className={classes.iconGroup}>
          <IconButton className={classes.iconButton}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <HomeIcon fontSize="small" />
          </IconButton>
        </div>
        <Spacer />
        <div className={classes.iconGroup}>
          <IconButton className={classes.iconButton}>
            <SearchIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={onOpenMenu("sort")}
            className={classes.iconButton}
          >
            <SortIcon fontSize="small" />
          </IconButton>
          <IconButton
            disabled={location.pathname === "/watch-list"}
            onClick={() => history.push("/watch-list")}
            className={classes.iconButton}
          >
            <TrendingUpIcon fontSize="small" />
          </IconButton>
        </div>
      </AppBar>
      <div className={classes.contentContainer}>{children}</div>
      {renderMenu(menuType)}
    </div>
  );
}
