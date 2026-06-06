import { CustomLink } from "./custom-link.tsx";

export const Header = () => {
  return (
    <ul>
      <li>
        <CustomLink to="/">Home</CustomLink>
      </li>
      <li>
        <CustomLink to="/profile">
          {({ isActive }) => <>Profile {isActive && "~"}</>}
        </CustomLink>
      </li>
      <li>
        <CustomLink to="/pokemon">Pokemons</CustomLink>
      </li>
      <li>
        <CustomLink to="/search">Search</CustomLink>
      </li>
      <li>
        <CustomLink to="/login">Login</CustomLink>
      </li>
      <li>
        <CustomLink to="/dashboard">Dashboard</CustomLink>
      </li>
      <li>
        <CustomLink to="/settings">Settings</CustomLink>
      </li>
      <li>
        <CustomLink to="/first-level">First level</CustomLink>
      </li>
      <li>
        <CustomLink to="/layouts/visibleLayout">Layouts</CustomLink>
      </li>
      <li>
        <CustomLink to="/steps" search={{ username: "Leonardo", step: 0 }}>
          Steps
        </CustomLink>
      </li>
    </ul>
  );
};
