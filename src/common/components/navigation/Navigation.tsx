import React from "react"
import { WithStyles } from "../../helpers/with-styles"
import styles from "./navigation.module.scss"
import useStore from "../../hooks/useStore"
import { Link } from "react-router-dom"
import logoImage from "../../images/logo.svg"
import NavLink from "./nav-link/NavLink"
import NavButton from "./nav-button/NavButton"
import { activatePopup } from "../popup/popup-slice"
import FormAuth from "../../../components/form-auth/FormAuth"
import NavDropDownMenuButton from "./nav-drop-down-menu-button/NavDropDownMenuButton"
import Avatar from "../avatar/Avatar"
import { resetAuthGlobal } from "../../actions/auth-slice"

const Navigation = WithStyles(({ styles }) => {
  const {
    dispatch,
    state: {
      auth: { isAuth, sub: userId, user },
    },
  } = useStore()

  const baseLinks = [
    {
      to: "/",
      icon: "home",
      label: "Home",
    },
    {
      to: "/search",
      icon: "search",
      label: "Search",
    },
  ]

  const unauthorizedLinks = [
    {
      to: "/blogs",
      icon: "library_books",
      label: "Blogs",
    },
    {
      to: "/files",
      icon: "photo_library",
      label: "Files",
    },
  ]

  const authorizedLinks = [
    {
      to: `/${userId}/stream`,
      icon: "cast",
      label: "Stream",
    },
    {
      to: `/${userId}/library`,
      icon: "collections_bookmark",
      label: "Library",
    },
    {
      to: "/blogs/edit",
      icon: "library_add",
      label: "Create",
    },
  ]

  const userLinks = [
    {
      to: `/${userId}`,
      label: "Profile",
    },
    {
      to: `/${userId}/blogs`,
      label: "Blogs",
    },
    {
      to: `/${userId}/files`,
      label: "Files",
    },
    {
      to: `/${userId}/comments`,
      label: "Comments",
    },
    {
      to: `/${userId}/subscribers`,
      label: "Subscribers",
    },
    {
      to: `/${userId}/publishers`,
      label: "Publishers",
    },
    {
      to: "/settings",
      label: "Settings",
    },
    {
      onClick: () => {
        dispatch(resetAuthGlobal())
      },
      label: "Logout",
    },
  ]

  const handlePopupAuth = () => {
    dispatch(activatePopup(FormAuth))
  }

  const links = isAuth
    ? baseLinks.concat(authorizedLinks)
    : baseLinks.concat(unauthorizedLinks)

  const mainLinks = links.map((link) => {
    return <NavLink {...link} key={link.to} />
  })

  return (
    <div className={styles.getClass("navigation")}>
      <Link to='/' className={styles.getClass("navigation__logo")}>
        <img src={logoImage} alt='Blogr logotype' />
      </Link>
      <div className={styles.getClass("navigation__links")}>{mainLinks}</div>
      {isAuth && user ? (
        <NavDropDownMenuButton options={userLinks}>
          <Avatar color={user.color} image={user?.avatar} />
        </NavDropDownMenuButton>
      ) : (
        <NavButton icon='exit_to_app' label='Login' onClick={handlePopupAuth} />
      )}
    </div>
  )
}, styles)

export default Navigation
