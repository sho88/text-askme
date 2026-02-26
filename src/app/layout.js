'use client';

export default function RootLayout({ children }) {
  console.log('Layout rendered');

  return (
    <html lang="en">
      <body>
        <p>Hello there how are you doing?</p>
        {children}
      </body>
    </html>
  );
}
