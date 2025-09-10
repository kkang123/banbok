"use client";

import { useAccessToken } from "../_hooks/useAccessToken";

export default function AccessTokenHandler() {
  useAccessToken();
  return null;
}
