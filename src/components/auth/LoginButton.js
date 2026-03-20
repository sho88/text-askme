// "use client";

// export default function LoginButton() {
//   return (
//     <button className="qa-button">
//       <a href="/auth/login">Host Login</a>
//     </button>
//   );
// }

"use client";

export default function LoginButton() {
  return (
    <button className="qa-button">
      <a href="/auth/login?returnTo=/dashboard">Login / Sign Up</a>
    </button>
  );
}
