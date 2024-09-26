"use client";

import {
  UserButton,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import styles from "../styles/Home.module.css";

export function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className={styles.header}>
      <div>My Todo App</div>
      {isSignedIn ? (
        <>
          <UserButton />
          <SignOutButton />
        </>
      ) : (
        <>
          <SignInButton />
          <SignUpButton />
        </>
      )}
    </header>
  );
}
