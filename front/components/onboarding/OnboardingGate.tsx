"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import OnboardingModal from "./OnBoardingModal";

export default function OnboardingGate() {
  const { user, accessToken } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user && !user.profileType) {
      setShow(true);
    }
  }, [user]);

  if (!user) return null;

  if (!show) return null;

  return (
    <OnboardingModal
      onComplete={async (data) => {
        await fetch("http://localhost:4000/users/onboarding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        });

        setShow(false);
        window.location.reload(); // refresh user context
      }}
    />
  );
}