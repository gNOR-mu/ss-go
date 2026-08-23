"use client"

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"


const config = defineConfig({
  globalCss: {
    ":root": {
      colorPalette: "gray"
    }
  },
  theme: {
    recipes: {
      button: {
        base: {
          colorPalette: "blue",
        },
        variants: {
          variant: {
            ghost: {
              _hover: {
                bg: "primary",
              },
            },
          },
        },
      },
    },
    tokens: {
    },
    semanticTokens: {
      colors: {
        primary: {
          value: {
            _dark: "{colors.colorPalette.900}",
          },
        },
        secondary: {
          value: {
            _dark: "{colors.colorPalette.800}",
          },
        },

        bg: {
          DEFAULT: {
            value: {
              _dark: "{colors.colorPalette.950}",
            },
          },
        },
      },
    },
  },
})

const system = createSystem(defaultConfig, config);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
