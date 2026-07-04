import React from "react";
import "./breadcrumb.css";

export function Breadcrumb(props: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" {...props} />;
}

export function BreadcrumbList(props: React.ComponentProps<"ol">) {
  const { className = "", ...rest } = props;

  return <ol className={`breadcrumb-list ${className}`} {...rest} />;
}

export function BreadcrumbItem(props: React.ComponentProps<"li">) {
  const { className = "", ...rest } = props;

  return <li className={`breadcrumb-item ${className}`} {...rest} />;
}

export function BreadcrumbLink(props: React.ComponentProps<"a">) {
  const { className = "", ...rest } = props;

  return <a className={`breadcrumb-link ${className}`} {...rest} />;
}

export function BreadcrumbPage(props: React.ComponentProps<"span">) {
  const { className = "", ...rest } = props;

  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={`breadcrumb-page ${className}`}
      {...rest}
    />
  );
}

export function BreadcrumbSeparator(props: React.ComponentProps<"li">) {
  const { children, className = "", ...rest } = props;

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={`breadcrumb-separator ${className}`}
      {...rest}
    >
      {children ?? "›"}
    </li>
  );
}

export function BreadcrumbEllipsis(props: React.ComponentProps<"span">) {
  const { className = "", ...rest } = props;

  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={`breadcrumb-ellipsis ${className}`}
      {...rest}
    >
      …<span className="sr-only">More</span>
    </span>
  );
}
