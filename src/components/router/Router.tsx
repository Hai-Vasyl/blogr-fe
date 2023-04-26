import Home from "../../pages/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogsBlog from "../../pages/blogs-blog/BlogsBlog";
import BlogsEditBlog from "../../pages/blogs-edit-blog/BlogsEditBlog";
import BlogsEdit from "../../pages/blogs-edit/BlogsEdit";
import Blogs from "../../pages/blogs/Blogs";
import Files from "../../pages/files/Files";
import NotFound from "../../pages/not-found/NotFound";
import SettingsAccount from "../../pages/settings-account/SettingsAccount";
import SettingsCategories from "../../pages/settings-categories/SettingsCategories";
import SettingsPermissions from "../../pages/settings-permissions/SettingsPermissions";
import SettingsRoles from "../../pages/settings-roles/SettingsRoles";
import SettingsTags from "../../pages/settings-tags/SettingsTags";
import SettingsUsers from "../../pages/settings-users/SettingsUsers";
import Settings from "../../pages/settings/Settings";
import UserBlogs from "../../pages/user-blogs/UserBlogs";
import UserComments from "../../pages/user-comments/UserComments";
import UserFiles from "../../pages/user-files/UserFiles";
import UserLibraryBlogs from "../../pages/user-library-blogs/UserLibraryBlogs";
import UserLibraryBookmarks from "../../pages/user-library-bookmarks/UserLibraryBookmarks";
import UserLibraryComments from "../../pages/user-library-comments/UserLibraryComments";
import UserLibraryFiles from "../../pages/user-library-files/UserLibraryFiles";
import UserLibrarySavedFiles from "../../pages/user-library-saved-files/UserLibrarySavedFiles";
import UserLibrary from "../../pages/user-library/UserLibrary";
import UserPublishers from "../../pages/user-publishers/UserPublishers";
import UserStream from "../../pages/user-stream/UserStream";
import UserSubscribers from "../../pages/user-subscribers/UserSubscribers";
import User from "../../pages/user/User";
import Search from "../../pages/search/Search";
import useStore from "../../common/hooks/useStore";
import Head from "../../common/components/head/Head";
import Navigation from "../../common/components/navigation/Navigation";

const Router = () => {
  const {
    state: {
      auth: { isAuth },
    },
  } = useStore();

  const baseRoutes = [
    {
      path: "/",
      title: "Blogr - Home",
      description: "Blogr - Home",
      element: <Home />,
    },
    {
      path: "/blogs",
      title: "Blogr - Blogs",
      description: "Blogr - List of blogs",
      element: <Blogs />,
    },
    {
      path: "/blogs/:blogId",
      title: "Blogr - Blog",
      description: "Blogr - Blog",
      element: <BlogsBlog />,
    },
    {
      path: "/files",
      title: "Blogr - Files",
      description: "Blogr - List of files",
      element: <Files />,
    },
    {
      path: "/search",
      title: "Blogr - Search",
      description: "Blogr - Search by phrase/tag",
      element: <Search />,
    },
    {
      path: "*",
      title: "Blogr - 404 page",
      description: "Blogr - Not found page",
      element: <NotFound />,
    },
  ];

  const authorizedRoutes = [
    {
      path: "/:userId",
      title: "Blogr - User profile",
      description: "Blogr - User profile",
      element: <User />,
    },
    {
      path: "/:userId/files",
      title: "Blogr - User files",
      description: "Blogr - List of user files",
      element: <UserFiles />,
    },
    {
      path: "/:userId/blogs",
      title: "Blogr - User blogs",
      description: "Blogr - List of user blogs",
      element: <UserBlogs />,
    },
    {
      path: "/:userId/comments",
      title: "Blogr - User comments",
      description: "Blogr - List of user comments",
      element: <UserComments />,
    },
    {
      path: "/:userId/library",
      title: "Blogr - User library",
      description:
        "Blogr - User library with list of liked blogs, files and comments, list of saved blogs and files",
      element: <UserLibrary />,
    },
    {
      path: "/:userId/library/files",
      title: "Blogr - User library of files",
      description: "Blogr - List of user liked files",
      element: <UserLibraryFiles />,
    },
    {
      path: "/:userId/library/blogs",
      title: "Blogr - User library of blogs",
      description: "Blogr - List of user liked blogs",
      element: <UserLibraryBlogs />,
    },
    {
      path: "/:userId/library/comments",
      title: "Blogr - User library of comments",
      description: "Blogr - List of user liked comments",
      element: <UserLibraryComments />,
    },
    {
      path: "/:userId/library/bookmarks",
      title: "Blogr - User library of bookmarks",
      description: "Blogr - List of user saved blogs",
      element: <UserLibraryBookmarks />,
    },
    {
      path: "/:userId/library/saved-files",
      title: "Blogr - User library of saved files",
      description: "Blogr - List of user saved files",
      element: <UserLibrarySavedFiles />,
    },
    {
      path: "/:userId/stream",
      title: "Blogr - User stream",
      description: "Blogr - List of content gathered from subscribers",
      element: <UserStream />,
    },
    {
      path: "/:userId/subscribers",
      title: "Blogr - User subscribers",
      description: "Blogr - List of user subscribers",
      element: <UserSubscribers />,
    },
    {
      path: "/:userId/publishers",
      title: "Blogr - User publishers",
      description: "Blogr - List of user publishers",
      element: <UserPublishers />,
    },
    {
      path: "/blogs/edit",
      title: "Blogr - Creating blog",
      description: "Blogr - Creating blog",
      element: <BlogsEdit />,
    },
    {
      path: "/blogs/edit/:blogId",
      title: "Blogr - Editing blog",
      description: "Blogr - Editing blog",
      element: <BlogsEditBlog />,
    },
    {
      path: "/settings",
      title: "Blogr - Settings",
      description: "Blogr - Settings",
      element: <Settings />,
    },
    {
      path: "/settings/account",
      title: "Blogr - Account settings",
      description: "Blogr - Account settings",
      element: <SettingsAccount />,
    },
    {
      path: "/settings/roles",
      title: "Blogr - Roles settings",
      description: "Blogr - Roles settings",
      element: <SettingsRoles />,
    },
    {
      path: "/settings/permissions",
      title: "Blogr - Permissions settings",
      description: "Blogr - Permissions settings",
      element: <SettingsPermissions />,
    },
    {
      path: "/settings/categories",
      title: "Blogr - Categories settings",
      description: "Blogr - Categories settings",
      element: <SettingsCategories />,
    },
    {
      path: "/settings/users",
      title: "Blogr - Users settings",
      description: "Blogr - Users settings",
      element: <SettingsUsers />,
    },
    {
      path: "/settings/tags",
      title: "Blogr - Tags settings",
      description: "Blogr - Tags settings",
      element: <SettingsTags />,
    },
  ];

  const routes = isAuth ? baseRoutes.concat(authorizedRoutes) : baseRoutes;
  const routerRoutes = routes.map(({ path, title, description, element }) => ({
    path,
    element: (
      <div>
        <Head title={title} description={description} />
        <Navigation />
        <div className="page-wrapper">{element}</div>
      </div>
    ),
  }));

  return <RouterProvider router={createBrowserRouter(routerRoutes)} />;
};

export default Router;
