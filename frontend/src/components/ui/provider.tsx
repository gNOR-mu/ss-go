"use client"

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"


const config = defineConfig({

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
            _light: "{colors.blue.50}",
            _dark: "{colors.blue.900}",
          },
        },
        secondary: {
          value: {
            _light: "{colors.blue.200}",
            _dark: "{colors.blue.800}",
          },
        },

        bg: {
          DEFAULT: {
            value: {
              _light: "{colors.blue.50}",
              _dark: "{colors.blue.950}",
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
