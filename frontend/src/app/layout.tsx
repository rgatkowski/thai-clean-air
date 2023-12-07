"use client";
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';

import DefaultTheme from '@tc/themes/DefaultTheme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider theme ={DefaultTheme}>
        <CssBaseline enableColorScheme/>
        <body>
          {children}
        </body> 
      </ThemeProvider>
    </html> 
  )
}