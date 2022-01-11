export const isAuthenticatedOnPlatform = (platform) => {
  const oauth = localStorage.getItem(`paypost_${platform}.oauth_token`);
  return !!oauth;
}