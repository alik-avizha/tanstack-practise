import { createLink, type LinkComponent } from "@tanstack/react-router";

export const TanStackLinkComponent = createLink("a");

const activeProps = {
  style: {
    fontWeight: "bold",
  },
};

export const CustomLink: LinkComponent<typeof TanStackLinkComponent> = (
  props,
) => {
  return (
    <TanStackLinkComponent
      preload="intent"
      activeProps={activeProps}
      {...props}
    />
  );
};
