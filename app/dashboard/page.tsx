"use client";
import { decodeJWT } from "@/lib/session";
import { JWTPayload } from "jose";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [sessionData, setSessionData] = useState<JWTPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userinfo = async () => {
      try {
        const sessionToken = sessionStorage.getItem("session");
        if (!sessionToken) {
          throw new Error("No session token found");
        }
        const d = decodeJWT(sessionToken);
        setSessionData(d);
      } catch (err) {
        console.error("Error during decryption:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    userinfo();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{JSON.stringify(sessionData)}</div>;
};

export default DashboardPage;
