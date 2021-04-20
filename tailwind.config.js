module.exports = {
  purge: ['./src/*.vue', './src/components/*.vue'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
