import { MantineThemeOverride } from "@mantine/core";
export const themeConfig: MantineThemeOverride = {
  fontFamily: "Trebuchet MS",
  primaryColor: "primary",
  focusRing: "never",
  colors: {
    primary: [
      "#FFE6F5",
      "#FFD4ED",
      "#FF7AC9",
      "#FFB1DD",
      "#FF9FD5",
      "#EC0B8C",
      "#EC008C",
      "#C1026B",
      "#990661",
      "#7E0552",
    ],
  },
  components: {
    NavLink: {
      defaultProps: {
        styles: {
          root: {
            padding: "4px 8px",
          },
          label: {
            fontSize: 12,
          },
        },
      },
    },
  },
};
