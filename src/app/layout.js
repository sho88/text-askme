"use client";

export default function RootLayout({ children }) {
  console.log("Layout rendered");

  return (
    <html lang="en">
      <body>
        <p>Error with the getServerSideProps functions. Review code again.</p>
        {children}
      </body>
    </html>
  );
}
s;
