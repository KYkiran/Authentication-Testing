// lib/cookies.js
const COOKIE_NAME = "token"; // or "auth_token"

export const setAuthCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: false,       // set true in production with HTTPS
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: false,       // match setAuthCookie
    sameSite: "lax",
  });
};

export const getAuthTokenFromRequest = (req) => {
  // prefer cookie, fallback to Authorization header for tools like Postman
  const cookieToken = req.cookies?.[COOKIE_NAME];
  const headerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  return cookieToken || headerToken || null;
};
