module.exports = {
  content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBlue: {
          100: "#0d1220",
          200: "#13192a",
        },
        cardBlue: {
          100: "#171d33",
          200: '#12182a'
        },
        borderBlue: '#113964',
        btnBlue: "#008bf9",
        discordBlue: "#5865f2",
        twitchBlue: "#6441a5"
      }
    },
  },
  plugins: [],
}