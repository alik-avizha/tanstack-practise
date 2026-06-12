import { createLink, type LinkComponent } from "@tanstack/react-router";

export const TanStackLinkComponent = createLink("a");

export const CustomLink: LinkComponent<typeof TanStackLinkComponent> = (
  props,
) => {
  const activeProps = {
    style: {
      fontWeight: "bold" as const,
      color: "#00f5ff",
      backgroundColor: "#1a1a25",
      borderColor: "rgba(0, 245, 255, 0.5)",
      boxShadow: "0 0 10px rgba(0, 245, 255, 0.2)",
    },
  };

  return (
    <TanStackLinkComponent
      preload="intent"
      activeProps={activeProps}
      {...props}
    />
  );
};
