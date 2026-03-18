"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import OnboardingModal from "./OnBoardingModal";

export default function OnboardingGate() {
  const { user, accessToken, refreshUser } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const shouldShow =
        typeof window !== "undefined" &&
        localStorage.getItem("show_onboarding_after_signup") === "true";
      if (user && !user.profileType && shouldShow) {
        // defer to avoid sync setState in effect
        setTimeout(() => setShow(true), 0);
      }
    } catch {
      if (user && !user.profileType) setTimeout(() => setShow(true), 0);
    }
  }, [user]);

  if (!user) return null;

  if (!show) return null;

  return (
    <OnboardingModal
      onComplete={async (data) => {
        try {
          const res = await fetch("http://localhost:4000/users/onboarding", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
          });

          if (!res.ok) {
            // return false so modal shows error
            return false;
          }

          // close modal, clear signup flag and refresh auth user in context
          try {
            localStorage.removeItem("show_onboarding_after_signup");
          } catch {}
          setShow(false);

          // refresh user in auth context so UI updates without a full reload
          try {
            await refreshUser();
          } catch (e) {
            console.error("Failed to refresh user after onboarding:", e);
          }

          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      }}
    />
  );
}
